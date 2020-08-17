package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentHeader}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfProperties, RdfReader}
import models.json.{ArrayJsonNode, JsonNode, ObjectJsonNode, StringValueJsonNode}
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityRelation, EntityRelationRelation, EntityType, OverlapsStepOrder, Schema, SchemaPath, Slot, Step, StepOrder, StepOrderFlag, StepParticipant}
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

import scala.collection.JavaConverters._
import scala.collection.mutable

final class ZeroDot8SdfDocumentReader(header: SdfDocumentHeader, sourceJson: String, sourceJsonNode: JsonNode) {
  private val nsPrefixMap = header.rootResource.getModel.getNsPrefixMap.asScala
  private val validationMessages = new mutable.ListBuffer[ValidationMessage]()

  implicit class SchemaResource(val resource: Resource) extends KairosProperties with SchemaOrgProperties with RdfProperties {
    def toTtlString(): String = {
      val resourceStringWriter = new StringWriter()
      resource.listProperties().toModel.write(resourceStringWriter, Lang.TTL.getName)
      resourceStringWriter.toString
    }
  }

  private def mapResourcesToObjectJsonNodes(jsonNodes: List[JsonNode], path: SchemaPath, resources: List[Resource]): List[(ObjectJsonNode, Resource)] = {
    val objectJsonNodes = jsonNodes.filter(_.isInstanceOf[ObjectJsonNode]).map(_.asInstanceOf[ObjectJsonNode])
    if (objectJsonNodes.size != resources.size) {
      validationMessages += ValidationMessage("different number of JSON nodes than resources", path, ValidationMessageType.Error)
      return List()
    }
    val objectJsonNodesByUri: Map[String, ObjectJsonNode] = objectJsonNodes.flatMap(objectJsonNode => {
      try {
        val idNode = objectJsonNode.map.get("@id").getOrElse(throw ValidationException("JSON node missing @id", path))
        if (!idNode.isInstanceOf[StringValueJsonNode]) {
          throw ValidationException(f"JSON node @id is not a string: ${idNode}", path)
        }
        val id = idNode.asInstanceOf[StringValueJsonNode].value
        val idParts = id.split(':')
        if (idParts.length == 1) {
          Some(id -> objectJsonNode)
        } else {
          val idNsPrefix = idParts(0)
          val idNsUri = nsPrefixMap.get(idNsPrefix).getOrElse(throw ValidationException(s"JSON node @id namespace prefix is not defined: ${idNsPrefix}", path))
          Some((idNsUri + idParts(1)) -> objectJsonNode)
        }
      } catch {
        case e: ValidationException => {
          // It's useful to have exceptions instead of a bunch of error checking above, but we want to continue processing.
          validationMessages ++= e.messages
          None
        }
      }
    }).toMap

    resources.flatMap(resource => {
      val resourceUri = resource.getURI
      val objectJsonNode = objectJsonNodesByUri.get(resourceUri)
      if (objectJsonNode.isDefined) {
        Some((objectJsonNode.get, resource))
      } else {
        validationMessages += ValidationMessage(s"resource ${resourceUri} does not correspond to a JSON node", path, ValidationMessageType.Error)
        None
      }
    })
  }

  private def readEntityRelation(parentPath: SchemaPath, resource: Resource) =
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

  private def readEntityRelationRelation(parentPath: SchemaPath, resource: Resource) =
    EntityRelationRelation(
      name = resource.name.headOption,
      relationObjects = resource.relationObject,
      relationPredicate = resource.relationPredicate.headOption.getOrElse(throw ValidationException(s"entity relation missing relation predicate: ${resource.toTtlString()}", parentPath))
    )

  private def readSchema(jsonNode: ObjectJsonNode, parentPath: SchemaPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = parentPath.copy(schemaId = Some(id))
    Schema(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      description = resource.description.headOption.getOrElse(s"schema ${id} missing required description property"),
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
      references = Option(resource.reference).filter(_.nonEmpty),
      sdfDocumentId = header.id,
      sourceJsonNodeLocation = jsonNode.location,
      slots = mapResourcesToObjectJsonNodes(
        jsonNodes = jsonNode.map.get("slots").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.slots,
      ).flatMap(entry =>
        try {
          Some(readSlot(jsonNode = entry._1, parentPath = path, resource =entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }
      ),
      steps = mapResourcesToObjectJsonNodes(
        jsonNodes = jsonNode.map.get("steps").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = resource.steps,
      ).flatMap(entry =>
        try {
          Some(readStep(jsonNode = entry._1, parentPath = path, resource =entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++ e.messages
            None
          }
        }
      ),
      `super` = resource.`super`.headOption,
      ta2 = false,
      template = resource.template.headOption,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"schema ${id} missing version property", path))
    )
  }

  private def readSlot(jsonNode: ObjectJsonNode, parentPath: SchemaPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = parentPath.copy(slotId = Some(id))
    Slot(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = Option(resource.entityTypes).filter(_.nonEmpty),
      id = id,
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName property", path)),
      sourceJsonNodeLocation = jsonNode.location
    )
  }

  private def readStepOrder(parentPath: SchemaPath, resource: Resource) = {
    val after = resource.after
    val before = resource.before
    val comments = Option(resource.comment).filter(_.nonEmpty)
    val contained = resource.contained
    val container = resource.container
    val flags = Option(resource.flags.map(flagString => StepOrderFlag.values.find(_.value == flagString).getOrElse(throw ValidationException(s"unknown step order flag ${flagString}", parentPath)))).filter(_.nonEmpty)
    val overlaps = resource.overlaps

    if (after.nonEmpty && before.nonEmpty) {
      BeforeAfterStepOrder(after = after, before = before, comments = comments, flags = flags)
    } else if (contained.nonEmpty && container.size == 1) {
      ContainerContainedStepOrder(comments = comments, container = container(0), contained = contained, flags = flags)
    } else if (overlaps.nonEmpty) {
      OverlapsStepOrder(comments = comments, flags = flags, overlaps = overlaps)
    } else {
      throw ValidationException(s"invalid step order:\n${resource.toTtlString()}", parentPath)
    }
  }

  private def readStepParticipant(jsonNode: ObjectJsonNode, parentPath: SchemaPath, resource: Resource): StepParticipant = {
    val id = Uri.parse(resource.getURI)
    val path = parentPath.copy(stepParticipantId = Some(id))
    StepParticipant(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = Option(resource.entityTypes).filter(_.nonEmpty),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required name property", path)),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      role = resource.role.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required role property", path)),
      sourceJsonNodeLocation = jsonNode.location,
    )
  }

  private def readStep(jsonNode: ObjectJsonNode, parentPath: SchemaPath, resource: Resource): Step = {
    val id = Uri.parse(resource.getURI)
    val path = parentPath.copy(stepId = Some(id))
    Step(
      achieves = Option(resource.achieves).filter(_.nonEmpty),
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      maxDuration = resource.maxDuration.map(Duration(_)).headOption,
      minDuration = resource.minDuration.map(Duration(_)).headOption,
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step ${id} missing required name property", path)),
      participants = Option(mapResourcesToObjectJsonNodes(
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
      provenances = Option(resource.provenance).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      requires = Option(resource.requires).filter(_.nonEmpty),
      sourceJsonNodeLocation = jsonNode.location,
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw ValidationException(s"step ${id} missing type", path)).getURI)
    )
  }

  def read(): SdfDocument = {
    val id = header.id
    val path = SchemaPath(sdfDocumentId = id)
    SdfDocument(
      id = id,
      schemas = mapResourcesToObjectJsonNodes(
        jsonNodes = sourceJsonNode.asInstanceOf[ObjectJsonNode].map.get("schemas").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = path,
        resources = header.rootResource.schemas
      ).flatMap(entry =>
        try {
          Some(readSchema(jsonNode = entry._1, parentPath = path, resource =entry._2))
        } catch {
          case e: ValidationException => {
            validationMessages ++= e.messages
            None
          }
        }),
      sdfVersion = ZeroDot8SdfDocumentReader.SdfVersion,
      sourceJson = sourceJson,
      validationMessages = validationMessages.toList
    )
  }
}

object ZeroDot8SdfDocumentReader {
  val SdfVersion = "0.8"
}
