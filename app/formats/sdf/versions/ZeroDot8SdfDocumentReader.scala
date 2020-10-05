package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.vocabulary.{KairosProperties, SchemaOrgProperties}
import formats.sdf.SdfDocumentHeader
import io.github.tetherlessworld.scena.RdfProperties
import models.json.{ArrayJsonNode, JsonNode, ObjectJsonNode, StringValueJsonNode}
import models.schema._
import models.sdfDocument.{SdfDocument, NamespacePrefix}
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

import scala.collection.JavaConverters._
import scala.collection.mutable

final class ZeroDot8SdfDocumentReader(header: SdfDocumentHeader, sourceJson: String, sourceJsonNode: JsonNode) {
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

  private def mapUriResourcesToJsonNodes(jsonNodes: List[JsonNode], path: DefinitionPath, resources: List[Resource]): List[(ObjectJsonNode, Resource)] =
    mapResourcesToJsonNodes(
      getObjectJsonNodeId = (objectJsonNode: ObjectJsonNode) => {
        try {
          val idNode = objectJsonNode.map.get("@id").getOrElse(throw ValidationException("JSON node missing @id", path))
          if (!idNode.isInstanceOf[StringValueJsonNode]) {
            throw ValidationException(f"JSON node @id is not a string: ${idNode}", path)
          }
          val id = idNode.asInstanceOf[StringValueJsonNode].value
          val idParts = id.split(':')
          if (idParts.length == 1) {
            Some(id)
          } else {
            val idNsPrefix = idParts(0)
            val idNsUri = nsPrefixMap.get(idNsPrefix).getOrElse(throw ValidationException(s"JSON node @id namespace prefix is not defined: ${idNsPrefix}", path))
            Some(idNsUri + idParts(1))
          }
        } catch {
          case e: ValidationException => {
            // It's useful to have exceptions instead of a bunch of error checking above, but we want to continue processing.
            validationMessages ++= e.messages
            None
          }
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

  private def readEntityRelation(parentPath: DefinitionPath, resource: Resource) =
    EntityRelation(
      comments = Option(resource.comment).filter(_.nonEmpty),
      relations = resource.relations.flatMap(entityRelationRelationResource =>
        try {
          Some(readEntityRelationRelation(parentPath, entityRelationRelationResource))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }
      ),
      relationSubject = resource.relationSubject.headOption.getOrElse(throw ValidationException(s"entity relation missing subject: ${resource.toTtlString()}", parentPath))
    )

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

  private def readEntityRelationRelation(parentPath: DefinitionPath, resource: Resource) =
    EntityRelationRelation(
      confidence = resource.confidence.headOption,
      name = resource.name.headOption,
      relationObjects = resource.relationObject,
      relationPredicate = resource.relationPredicate.headOption.getOrElse(throw ValidationException(s"entity relation missing relation predicate: ${resource.toTtlString()}", parentPath))
    )

  private def readPrimitive(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).primitive(id).build
    models.schema.Primitive(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      description = resource.description.headOption.getOrElse(s"primitive ${id} missing required description property"),
      id = id,
      maxDuration = resource.maxDuration.map(Duration(_)).headOption,
      minDuration = resource.minDuration.map(Duration(_)).headOption,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required name property", path)),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      slots = mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("slots").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.slots,
      ).flatMap(entry =>
        try {
          Some(readPrimitiveSlot(jsonNode = entry._1, parentPath = path, resource = entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }
      ),
      sourceJsonNodeLocation = jsonNode.location,
      `super` = resource.`super`.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required super property", path)),
      template = resource.template.headOption,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing requirde version property", path))
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
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName property", path)),
      sourceJsonNodeLocation = jsonNode.location,
      `super` = resource.`super`.headOption.getOrElse(throw ValidationException(s"primitive ${id} missing required super property", path))
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
      description = resource.description.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required description property", path)),
      entityRelations = resource.entityRelations.flatMap(entityRelationResource =>
        try {
          Some(readEntityRelation(path, entityRelationResource))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }
      ),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required name property", path)),
      order = resource.order.flatMap(stepOrderResource =>
        try {
          Some(readStepOrder(path, stepOrderResource))
        } catch {
          case e: ValidationException => {
            validationMessages ++ e.messages
            None
          }
        }
      ),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      slots = mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("slots").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.slots,
      ).flatMap(entry =>
        try {
          Some(readSchemaSlot(jsonNode = entry._1, parentPath = path, resource = entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }
      ),
      sourceJsonNodeLocation = jsonNode.location,
      steps = Steps(
        list = mapUriResourcesToJsonNodes(
          jsonNodes = stepsJsonNode.list,
          path = path,
          resources = resource.steps,
        ).flatMap(entry =>
          try {
            Some(readStep(jsonNode = entry._1, parentPath = path, resource = entry._2))
          } catch {
            case e: ValidationException => {
              validationMessages ++ e.messages
              None
            }
          }
        ), sourceJsonNodeLocation = stepsJsonNode.location,
      ),
      ta2 = ta2,
      template = resource.template.headOption,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"schema ${id} missing version property", path))
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
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName property", path)),
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
      maxDuration = resource.maxDuration.map(Duration(_)).headOption,
      minDuration = resource.minDuration.map(Duration(_)).headOption,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step ${id} missing required name property", path)),
      participants = Option(mapUriResourcesToJsonNodes(
        jsonNodes = jsonNode.map.get("participants").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.participants
      ).flatMap(entry =>
        try {
          Some(readStepParticipant(jsonNode = entry._1, parentPath = path, resource = entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        })).filter(_.nonEmpty),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      provenances = Option(resource.provenance).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      requires = Option(resource.requires).filter(_.nonEmpty),
      sourceJsonNodeLocation = jsonNode.location,
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw ValidationException(s"step ${id} missing type", path)).getURI)
    )
  }

  private def readStepOrder(parentPath: DefinitionPath, resource: Resource) = {
    val after = resource.after
    val before = resource.before
    val comments = Option(resource.comment).filter(_.nonEmpty)
    val confidence = resource.confidence.headOption
    val contained = resource.contained
    val container = resource.container
    val flags = Option(resource.flags.map(flagString => StepOrderFlag.values.find(_.value == flagString).getOrElse(throw ValidationException(s"unknown step order flag ${flagString}", parentPath)))).filter(_.nonEmpty)
    val overlaps = resource.overlaps

    if (after.nonEmpty && before.nonEmpty) {
      BeforeAfterStepOrder(after = after, before = before, comments = comments, confidence = confidence, flags = flags)
    } else if (contained.nonEmpty && container.size == 1) {
      ContainerContainedStepOrder(comments = comments, confidence = confidence, container = container(0), contained = contained, flags = flags)
    } else if (overlaps.nonEmpty) {
      OverlapsStepOrder(comments = comments, confidence = confidence, flags = flags, overlaps = overlaps)
    } else {
      throw ValidationException(s"invalid step order:\n${resource.toTtlString()}", parentPath)
    }
  }

  private def readStepParticipant(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource): StepParticipant = {
    val id = Uri.parse(resource.getURI)
    val path = DefinitionPath.sdfDocument(parentPath.sdfDocument.id).schema(parentPath.sdfDocument.schema.get.id).step(parentPath.sdfDocument.schema.get.step.get.id).participant(id)
    StepParticipant(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = readEntityTypes(parentPath = path, resource = resource),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required name property", path)),
      path = path,
      privateData = getDefinitionPrivateData(jsonNode, path),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      role = resource.role.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required role property", path)),
      sourceJsonNodeLocation = jsonNode.location,
      values = Option(mapResourcesToJsonNodes(
        getObjectJsonNodeId = (objectJsonNode) => objectJsonNode.map.get("name").filter(_.isInstanceOf[StringValueJsonNode]).map(_.asInstanceOf[StringValueJsonNode].value),
        getResourceId = (resource) => resource.name.headOption,
        jsonNodes = jsonNode.map.get("values").filter(_.isInstanceOf[ArrayJsonNode]).map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.values
      ).flatMap(entry =>
        try {
          Some(readStepParticipantValue(jsonNode = entry._1, parentPath = path, resource = entry._2, stepParticipantId = id))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        })).filter(_.nonEmpty),
    )
  }

  private def readStepParticipantValue(jsonNode: ObjectJsonNode, parentPath: DefinitionPath, resource: Resource, stepParticipantId: Uri): StepParticipantValue = {
    StepParticipantValue(
      comments = Option(resource.comment).filter(_.nonEmpty),
      confidence = resource.confidence.headOption.getOrElse(throw ValidationException(s"step participant value in step participant ${stepParticipantId} missing required confidence", parentPath)),
      entityTypes = readEntityTypes(parentPath = parentPath, resource = resource).getOrElse(throw ValidationException(s"step participant value in step participant ${stepParticipantId} missing required entityTypes or variant", parentPath)),
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step participant value in step participant ${stepParticipantId} missing required name property", parentPath)),
      privateData = getDefinitionPrivateData(jsonNode, parentPath),
      provenances = Option(resource.provenance).filter(_.nonEmpty).getOrElse(throw ValidationException(s"step participant value in step participant ${stepParticipantId} missing required provenance", parentPath)),
      sourceJsonNodeLocation = jsonNode.location
    )
  }

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
      ).flatMap(entry =>
        try {
          Some(readPrimitive(jsonNode = entry._1, parentPath = path, resource = entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }),
      schemas = mapUriResourcesToJsonNodes(
        jsonNodes = sourceJsonNode.asInstanceOf[ObjectJsonNode].map.get("schemas").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = header.rootResource.schemas
      ).flatMap(entry =>
        try {
          Some(readSchema(jsonNode = entry._1, parentPath = path, resource = entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }),
      sdfVersion = header.sdfVersion,
      sourceJson = sourceJson,
      validationMessages = validationMessages.toList
    )
  }
}
