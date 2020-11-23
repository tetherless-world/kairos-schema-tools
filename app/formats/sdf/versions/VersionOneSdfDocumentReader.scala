package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.vocabulary.{KairosProperties, SchemaOrgProperties}
import formats.sdf.{SdfDocumentHeader, UriParseException}
import io.github.tetherlessworld.scena.RdfProperties
import models.json.{ArrayJsonNode, JsonNode, ObjectJsonNode, StringValueJsonNode}
import models.schema._
import models.sdfDocument.{NamespacePrefix, SdfDocument}
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

import scala.collection.JavaConverters._
import scala.collection.mutable

final class VersionOneSdfDocumentReader(header: SdfDocumentHeader, sourceJson: String, sourceJsonNode: JsonNode) {
  private val nsPrefixMap = header.rootResource.getModel.getNsPrefixMap.asScala
  private val ta2 = header.rootResource.ta2.getOrElse(false)
  private val validationMessages = new mutable.ListBuffer[ValidationMessage]()

  implicit class SchemaResource(val resource: Resource) extends KairosProperties with SchemaOrgProperties with RdfProperties {
    def toTtlString(): String = {
      val resourceStringWriter = new StringWriter()
      resource.listProperties().toModel.write(resourceStringWriter, Lang.TTL.getName)
      resourceStringWriter.toString
    }
  }

  private def expandNamespacePrefix(id: String): String = {
    val idParts = id.split(':')
    if (idParts.length == 1) {
      id
    } else {
      val idNsPrefix = idParts(0)
      val idNsUri = nsPrefixMap.get(idNsPrefix)
      if (idNsUri.isDefined) {
        idNsUri.get + idParts(1)
      } else {
        id
      }
    }
  }

  private def getDefinitionPrivateData(jsonNode: ObjectJsonNode, path: DefinitionPath): Option[String] = {
    jsonNode.map.get("privateData").flatMap(privateDataNode => {
      if (privateDataNode.isInstanceOf[ObjectJsonNode]) {
        Some(privateDataNode.asInstanceOf[ObjectJsonNode].text)
      } else {
        validationMessages += ValidationMessage("privateData is not a JSON object", path, ValidationMessageType.Error)
        None
      }
    })
  }

  private def getProvenanceDataObjectId(jsonNode: ObjectJsonNode): Option[String] =
    jsonNode.map.get("@id").orElse(jsonNode.map.get("provenance")).filter(_.isInstanceOf[StringValueJsonNode]).map(_.asInstanceOf[StringValueJsonNode].value)

  private def mapUriResourcesToJsonNodes(jsonNodes: List[JsonNode], path: DefinitionPath, resources: List[Resource]): List[(ObjectJsonNode, Resource)] =
    mapResourcesToJsonNodes(
      getObjectJsonNodeId = (objectJsonNode: ObjectJsonNode) => {
        withValidationExceptionCatchOption(path) { () =>
          val idNode = objectJsonNode.map.get("@id").getOrElse(throw ValidationException("JSON node missing @id", path))
          if (!idNode.isInstanceOf[StringValueJsonNode]) {
            throw ValidationException(f"JSON node @id is not a string: ${idNode}", path)
          }
          val id = idNode.asInstanceOf[StringValueJsonNode].value
          expandNamespacePrefix(id)
        }
      },
      getResourceId = (resource: Resource) => Option(resource.getURI),
      jsonNodes = jsonNodes,
      path = path,
      resources = resources
    )

  private def
  mapResourcesToJsonNodes(
                           getObjectJsonNodeId: (ObjectJsonNode) => Option[String],
                           getResourceId: (Resource) => Option[String],
                           jsonNodes: List[JsonNode],
                           path: DefinitionPath,
                           resources: List[Resource]
                         ): List[(ObjectJsonNode, Resource)] = {
    val objectJsonNodes = jsonNodes.filter(_.isInstanceOf[ObjectJsonNode]).map(_.asInstanceOf[ObjectJsonNode])
    if (objectJsonNodes.size != resources.size) {
      validationMessages += ValidationMessage("different number of JSON nodes than resources", path, ValidationMessageType.Error)
      return List()
    }
    val objectJsonNodesById: Map[String, ObjectJsonNode] =
      objectJsonNodes.flatMap(objectJsonNode => getObjectJsonNodeId(objectJsonNode).map(id => (id -> objectJsonNode))).toMap

    resources.flatMap(resource => {
      getResourceId(resource).flatMap(resourceId => {
        val objectJsonNode = objectJsonNodesById.get(resourceId)
        if (objectJsonNode.isDefined) {
          Some((objectJsonNode.get, resource))
        } else {
          validationMessages += ValidationMessage(s"resource ${resourceId} does not correspond to a JSON node", path, ValidationMessageType.Error)
          None
        }
      })
    })
  }

  private def readEntity(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource): Entity = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).entity(id)
    Entity(
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = readEntityTypes(parentPath = path, resource = resource).getOrElse(throw ValidationException(s"entity ${id} missing required entityTypes", path)),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"entity ${id} missing required name", path)),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      sourceJsonNodeLocation = jsonNode.location,
    )
  }

  private def readEntityRelations(parentPath: DefinitionPath, resource: Resource): List[EntityRelation] = {
    val comments = Option(resource.comment).filter(_.nonEmpty)
    val subject = resource.relationSubject.headOption.getOrElse(throw ValidationException(s"entity relation missing subject: ${resource.toTtlString()}", parentPath))

    resource.relations.zipWithIndex.flatMap({ case (entityRelationRelationResource, entityRelationRelationIndex) =>
      withValidationExceptionCatchOption(parentPath)(() =>
        EntityRelation(
          comments = comments,
          confidence = entityRelationRelationResource.confidence.headOption,
          id = Option(entityRelationRelationResource.getURI).map(Uri.parse(_)),
          index = entityRelationRelationIndex,
          modalities = readModalities(parentPath, entityRelationRelationResource),
          name = entityRelationRelationResource.name.headOption,
          references = Option(entityRelationRelationResource.reference).filter(_.nonEmpty),
          `object` = entityRelationRelationResource.relationObject.headOption.getOrElse(throw ValidationException(s"entity relation missing relation object: ${entityRelationRelationResource.toTtlString()}", parentPath)),
          predicate = entityRelationRelationResource.relationPredicate.headOption.getOrElse(throw ValidationException(s"entity relation missing relation predicate: ${entityRelationRelationResource.toTtlString()}", parentPath)),
          provenances = Option(entityRelationRelationResource.provenance).filter(_.nonEmpty),
          relationProvenance = entityRelationRelationResource.relationProvenance.headOption,
          subject = subject,
          ta1ref = entityRelationRelationResource.ta1ref.headOption
        )
      )
    })
  }

  private def readEntityTypes(parentPath: DefinitionPath, resource: Resource): Option[EntityTypes] = {
    var and: Boolean = false  // "entityTypes" is functionally equivalent to "entityTypes_OR"
    var entityTypeUris = resource.entityTypes
    if (entityTypeUris.isEmpty) {
      entityTypeUris = resource.entityTypes_OR
      if (entityTypeUris.isEmpty) {
        entityTypeUris = resource.entityTypes_AND
        if (entityTypeUris.isEmpty) {
          return None
        }
        and = true
      }
    }

    val entityTypes = entityTypeUris.flatMap(uri => {
      val abbreviation = uri.toString.substring(uri.toString.lastIndexOf('/') + 1)
      val entityType = EntityType.values.find(_.value == abbreviation)
      if (!entityType.isDefined) {
        validationMessages += ValidationMessage(message = s"unknown entity type ${abbreviation}", path = parentPath, `type` = ValidationMessageType.Error)
      }
      entityType
    })

    if (entityTypes.isEmpty) {
      return None
    }

    Some(EntityTypes(and=and, entityTypes=entityTypes))
  }

  private def readModalities(parentPath: DefinitionPath, resource: Resource): Option[List[Modality]] =
    Option(resource.modality.map(modalityString => Modality.values.find(_.value == modalityString).getOrElse(throw ValidationException(s"unknown modality ${modalityString}", parentPath)))).filter(_.nonEmpty)

  private def readOrder(index: Int, parentPath: DefinitionPath, resource: Resource) = {
    val after = resource.after
    val before = resource.before
    val comments = Option(resource.comment).filter(_.nonEmpty)
    val confidence = resource.confidence.headOption
    val contained = resource.contained
    val container = resource.container
    val flags = Option(resource.flags.map(flagString => OrderFlag.values.find(_.value == flagString).getOrElse(throw ValidationException(s"unknown step order flag ${flagString}", parentPath)))).filter(_.nonEmpty)
    val id = Option(resource.getURI).map(Uri.parse(_))
    val overlaps = resource.overlaps
    val provenances = Option(resource.provenance).filter(_.nonEmpty)
    val ta1ref = resource.ta1ref.headOption

    if (after.nonEmpty && before.nonEmpty) {
      BeforeAfterOrder(
        after = after,
        before = before,
        comments = comments,
        confidence = confidence,
        flags = flags,
        id = id,
        index = index,
        provenances = provenances,
        ta1ref = ta1ref
      )
    } else if (contained.nonEmpty && container.size == 1) {
      ContainerContainedOrder(
        comments = comments,
        confidence = confidence,
        container = container(0),
        contained = contained,
        flags = flags,
        id = id,
        index = index,
        provenances = provenances,
        ta1ref = ta1ref
      )
    } else if (overlaps.nonEmpty) {
      OverlapsOrder(
        comments = comments,
        confidence = confidence,
        flags = flags,
        id = id,
        index = index,
        overlaps = overlaps,
        provenances = provenances,
        ta1ref = ta1ref
      )
    } else {
      throw ValidationException(s"invalid step order:\n${resource.toTtlString()}", parentPath)
    }
  }

  private def readParticipant(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource): Participant = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).step(parentPath.sdfDocument.schema.get.step.get.id).participant(id)
    Participant(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = readEntityTypes(parentPath = path, resource = resource),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required name", path)),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      role = resource.role.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required role", path)),
      sourceJsonNodeLocation = jsonNode.location,
      values = Option(mapResourcesToJsonNodes(
        getObjectJsonNodeId = (objectJsonNode) => objectJsonNode.map.get("entity").filter(_.isInstanceOf[StringValueJsonNode]).map(_.asInstanceOf[StringValueJsonNode].value).map(expandNamespacePrefix(_)),
        getResourceId = (resource) => resource.entity.headOption.map(_.toString),
        jsonNodes = jsonNode.map.get("values").map({
          case valuesJsonNode: ArrayJsonNode => valuesJsonNode.list
          case valuesJsonNode: ObjectJsonNode => List(valuesJsonNode)
          case _ => List()
        }).getOrElse(List()),
        path = path,
        resources = resource.values
      ).flatMap(entry => withValidationExceptionCatchOption(path)(() => readValue(jsonNode = entry._1, parentPath = path, resource = entry._2, participantId = id)))).filter(_.nonEmpty),
    )
  }

  private def readPrimitive(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).primitive(id).build
    models.schema.Primitive(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      description = resource.description.headOption.getOrElse(s"primitive ${id} missing required description"),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required name", path)),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      slots = mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("slots").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.slots,
      ).flatMap(entry =>
        withValidationExceptionCatchOption(path)(() => readPrimitiveSlot(jsonNode = entry._1, parentPath = path, resource = entry._2))
      ),
      sourceJsonNodeLocation = jsonNode.location,
      `super` = resource.`super`.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required super", path)),
      template = resource.template.headOption,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing requirde version", path))
    )
  }

  private def readPrimitiveSlot(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).primitive(parentPath.sdfDocument.primitive.get.id).slot(id)
    PrimitiveSlot(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = readEntityTypes(parentPath = path, resource = resource),
      id = id,
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName", path)),
      sourceJsonNodeLocation = jsonNode.location,
      `super` = resource.`super`.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required super", path))
    )
  }

  private def readProvenanceDataObject(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = getProvenanceDataObjectId(jsonNode).getOrElse(throw ValidationException(s"provenanceDataObject missing @id or provenance", parentPath))
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).provenanceDataObject(id)
    ProvenanceDataObject(
      boundingBox = Option(resource.boundingBox).filter(_.nonEmpty),
      childId = resource.childId.headOption.getOrElse(throw ValidationException(s"provenanceData object ${id} missing required childID", path)),
      comments = Option(resource.comment).filter(_.nonEmpty),
      endTime = resource.startTime.headOption,
      keyframes = Option(resource.keyframes).filter(_.nonEmpty),
      id = id,
      length = resource.length.headOption,
      mediaType = resource.mediaType.headOption.getOrElse(throw ValidationException(s"provenanceData object ${id} missing required mediaType", path)),
      offset = resource.offset.headOption,
      parentIds = Option(resource.parentIds).filter(_.nonEmpty),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      sourceJsonNodeLocation = jsonNode.location,
      startTime = resource.startTime.headOption
    )
  }

  private def readSchema(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(id).build
    val stepsJsonNode = jsonNode.map.get("steps").map(_.asInstanceOf[ArrayJsonNode]).getOrElse(throw ValidationException(s"schema ${id} missing required steps", path))
    Schema(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      confidence = resource.confidence.headOption,
      description = resource.description.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required description", path)),
      entities = Option(mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("entities").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.entities,
      ).flatMap(entry =>
        withValidationExceptionCatchOption(path)(() => readEntity(jsonNode = entry._1, parentPath = path, resource = entry._2))
      )).filter(_.nonEmpty),
      entityRelations = resource.entityRelations.flatMap(entityRelationResource =>
        withValidationExceptionCatchList(path)(() => readEntityRelations(path, entityRelationResource))
      ),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required name", path)),
      order = resource.order.zipWithIndex.flatMap({ case (orderResource, orderIndex) => withValidationExceptionCatchOption(path)(() => readOrder(orderIndex, path, orderResource)) }),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      provenanceData = Option(mapResourcesToJsonNodes(
        getObjectJsonNodeId = getProvenanceDataObjectId,
        getResourceId = (resource) => {
          if (resource.getURI != null && resource.getURI.startsWith(header.baseUri.toString))
            Some(resource.getURI.substring(header.baseUri.toString.length))
          else
            resource.provenance.headOption
        },
        jsonNodes = jsonNode.map.get("provenanceData").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.provenanceData,
      ).flatMap(entry =>
        withValidationExceptionCatchOption(path)(() => readProvenanceDataObject(jsonNode = entry._1, parentPath = path, resource = entry._2))
      )).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      slots = mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("slots").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.slots,
      ).flatMap(entry =>
        withValidationExceptionCatchOption(path)(() => readSchemaSlot(jsonNode = entry._1, parentPath = path, resource = entry._2))
      ),
      sourceJsonNodeLocation = jsonNode.location,
      steps = Steps(
        list = mapUriResourcesToJsonNodes(
          jsonNodes = stepsJsonNode.list,
          path = path,
          resources = resource.steps,
        ).flatMap(entry => withValidationExceptionCatchOption(path)(() => readStep(jsonNode = entry._1, parentPath = path, resource = entry._2))),
        sourceJsonNodeLocation = stepsJsonNode.location,
      ),
      ta2 = ta2,
      template = resource.template.headOption,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"schema ${id} missing version", path))
    )
  }

  private def readSchemaSlot(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).slot(id)
    SchemaSlot(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = readEntityTypes(parentPath = path, resource = resource),
      id = id,
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName", path)),
      sourceJsonNodeLocation = jsonNode.location
    )
  }

  private def readStep(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource): Step = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).step(id).build
    Step(
      achieves = Option(resource.achieves).filter(_.nonEmpty),
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      confidence = resource.confidence.headOption,
      id = id,
      maxDuration = resource.maxDuration.headOption.map(Duration(_)),
      modalities = readModalities(path, resource),
      minDuration = resource.minDuration.headOption.map(Duration(_)),
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step ${id} missing required name", path)),
      participants = Option(mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("participants").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.participants
      ).flatMap(entry => withValidationExceptionCatchOption(path)(() => readParticipant(jsonNode = entry._1, parentPath = path, resource = entry._2)))).filter(_.nonEmpty),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      provenances = Option(resource.provenance).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      requires = Option(resource.requires).filter(_.nonEmpty),
      sourceJsonNodeLocation = jsonNode.location,
      ta1ref = resource.ta1ref.headOption,
      temporalObjects = Option(resource.temporal.map(readTemporalObject(path, _))).filter(_.nonEmpty),
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw ValidationException(s"step ${id} missing type", path)).getURI)
    )
  }

  private def readTemporalObject(parentPath: DefinitionPath, resource: Resource) =
    TemporalObject(
      absoluteTime = resource.absoluteTime.headOption.map(DateTime(_)),
      comments = Option(resource.comment).filter(_.nonEmpty),
      confidence = resource.confidence.headOption.getOrElse(throw ValidationException(s"temporal object in schema ${parentPath.sdfDocument.schema.get.id} missing required confidence", parentPath)),
      duration = resource.duration.headOption.map(Duration(_)),
      label = resource.getId.toString,
      earliestEndTime = resource.earliestEndTime.headOption.map(DateTime(_)),
      earliestStartTime = resource.earliestStartTime.headOption.map(DateTime(_)),
      latestEndTime = resource.latestEndTime.headOption.map(DateTime(_)),
      latestStartTime = resource.latestStartTime.headOption.map(DateTime(_)),
      provenances = Option(resource.provenance).filter(_.nonEmpty)
    )

  def read(): SdfDocument = {
    val id = header.id
    val path = DefinitionPath.sdfDocument(id).build
    SdfDocument(
      id = id,
      namespacePrefixes = header.rootResource.getModel.getNsPrefixMap.asScala.map(entry => NamespacePrefix(prefix = entry._1, uri = Uri.parse(entry._2))).toList,
      primitives = mapUriResourcesToJsonNodes(
        jsonNodes = sourceJsonNode.asInstanceOf[ObjectJsonNode].map.get("primitives").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = header.rootResource.primitives
      ).flatMap(entry => withValidationExceptionCatchOption(path)(() => readPrimitive(jsonNode = entry._1, parentPath = path, resource = entry._2))),
      schemas = mapUriResourcesToJsonNodes(
        jsonNodes = sourceJsonNode.asInstanceOf[ObjectJsonNode].map.get("schemas").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = header.rootResource.schemas
      ).flatMap(entry =>
        withValidationExceptionCatchOption(path)(() => readSchema(jsonNode = entry._1, parentPath = path, resource = entry._2))),
      sdfVersion = header.sdfVersion,
      sourceJson = sourceJson,
      task2 = header.rootResource.task2,
      validationMessages = validationMessages.toList
    )
  }

  private def readValue(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource, participantId: Uri): Value =
    Value(
      comments = Option(resource.comment).filter(_.nonEmpty),
      confidence = resource.confidence.headOption.getOrElse(throw ValidationException(s"step participant value in step participant ${participantId} missing required confidence", parentPath)),
      entity = resource.entity.headOption.getOrElse(throw ValidationException(s"step participant value in step participant ${participantId} missing required entity", parentPath)),
      //      entityTypes = readEntityTypes(parentPath = parentPath, resource = resource).getOrElse(throw ValidationException(s"step participant value in participant ${participantId} missing required entityTypes or variant", parentPath)),
      modalities = readModalities(parentPath, resource),
      privateData = getDefinitionPrivateData(jsonNode, parentPath),
      provenances = Option(resource.provenance).filter(_.nonEmpty).getOrElse(throw ValidationException(s"step participant value in step participant ${participantId} missing required provenance", parentPath)),
      sourceJsonNodeLocation = jsonNode.location
    )

  private def withValidationExceptionCatchOption[T](path: DefinitionPath)(f: () => T): Option[T] = {
    try {
      Some(f())
    } catch {
      case e: UriParseException => {
        validationMessages += ValidationMessage(s"error parsing URI: ${e.getMessage}", path, ValidationMessageType.Error)
        None
      }
      case e: ValidationException => {
        validationMessages ++= e.messages
        None
      }
    }
  }

  private def withValidationExceptionCatchList[T](path: DefinitionPath)(f: () => List[T]): List[T] = {
    try {
      f()
    } catch {
      case e: UriParseException => {
        validationMessages += ValidationMessage(s"error parsing URI: ${e.getMessage}", path, ValidationMessageType.Error)
        List()
      }
      case e: ValidationException => {
        validationMessages ++= e.messages
        List()
      }
    }
  }
}
