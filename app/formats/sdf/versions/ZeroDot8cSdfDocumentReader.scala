package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentHeader}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfProperties, RdfReader}
import models.json.{ArrayJsonNode, JsonNode, ObjectJsonNode, StringValueJsonNode}
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityRelation, EntityRelationRelation, EntityType, OverlapsStepOrder, Schema, SchemaPath, Slot, Step, StepOrder, StepOrderFlag, StepParticipant}
import models.validation.ValidationException
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

import scala.collection.JavaConverters._

final class ZeroDot8cSdfDocumentReader(header: SdfDocumentHeader, sourceJson: String, sourceJsonNode: JsonNode) {
  private val id = header.id
  private val documentPath = SchemaPath(sdfDocumentId = id)
  private val nsPrefixMap = header.rootResource.getModel.getNsPrefixMap.asScala

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
      throw ValidationException("different number of JSON nodes than resources", path)
    }
    val objectJsonNodesByUri: Map[String, ObjectJsonNode] = objectJsonNodes.map(objectJsonNode => {
      val idNode = objectJsonNode.map.get("@id").getOrElse(throw ValidationException("JSON node missing @id", path))
      if (!idNode.isInstanceOf[StringValueJsonNode]) {
        throw ValidationException(f"JSON node @id is not a string: ${idNode}", path)
      }
      val id = idNode.asInstanceOf[StringValueJsonNode].value
      val idParts = id.split(':')
      if (idParts.length == 1) {
        id -> objectJsonNode
      } else {
        val idNsPrefix = idParts(0)
        val idNsUri = nsPrefixMap.get(idNsPrefix).getOrElse(throw ValidationException(s"JSON node @id namespace prefix is not defined: ${idNsPrefix}", path))
        (idNsUri + idParts(1)) -> objectJsonNode
      }
    }).toMap

    resources.map(resource => {
      val resourceUri = resource.getURI
      val objectJsonNode = objectJsonNodesByUri.get(resourceUri).getOrElse(throw ValidationException(s"resource ${resourceUri} does not correspond to a JSON node", path))
      (objectJsonNode, resource)
    })
  }

  private def readEntityRelation(resource: Resource) =
    EntityRelation(
      comments = Option(resource.comment).filter(_.nonEmpty),
      relations = resource.relations.map(readEntityRelationRelation(_)),
      relationSubject = resource.relationSubject.headOption.getOrElse(throw ValidationException(s"entity relation missing subject: ${resource.toTtlString()}", documentPath))
    )

  private def readEntityRelationRelation(resource: Resource) =
    EntityRelationRelation(
      relationObjects = resource.relationObject,
      relationPredicate = resource.relationPredicate.headOption.getOrElse(throw ValidationException(s"entity relation missing relation predicate: ${resource.toTtlString()}", documentPath))
    )

  private def readSchema(jsonNode: ObjectJsonNode, parentPath: SchemaPath, resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    val path = parentPath.copy(schemaId = Some(id))
    Schema(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      description = resource.description.headOption.getOrElse(s"schema ${id} missing required description property"),
      entityRelations = resource.entityRelations.map(readEntityRelation(_)),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required name property", path)),
      order = resource.order.map(readStepOrder(_)),
      references = Option(resource.reference).filter(_.nonEmpty),
      sdfDocumentId = id,
      sourceJsonNodeLocation = jsonNode.location,
      slots = resource.slots.map(readSlot(_)),
      steps = resource.steps.map(readStep(_)),
      `super` = resource.`super`.headOption,
      ta2 = false,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"schema ${id} missing version property", path))
    )
  }

  private def readSlot(resource: Resource) = {
    val id = Uri.parse(resource.getURI)
    Slot(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = Option(resource.entityTypes).filter(_.nonEmpty),
      id = id,
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      roleName = resource.roleName.headOption.getOrElse(throw ValidationException(s"slot ${id} missing required roleName property", documentPath))
    )
  }

  private def readStepOrder(resource: Resource) = {
    val after = resource.after
    val before = resource.before
    val comments = Option(resource.comment).filter(_.nonEmpty)
    val contained = resource.contained
    val container = resource.container
    val flags = Option(resource.flags.map(flagString => StepOrderFlag.values.find(_.value == flagString).getOrElse(throw ValidationException(s"unknown step order flag ${flagString}", documentPath)))).filter(_.nonEmpty)
    val overlaps = resource.overlaps

    if (after.nonEmpty && before.nonEmpty) {
      BeforeAfterStepOrder(after = after, before = before, comments = comments, flags = flags)
    } else if (contained.nonEmpty && container.size == 1) {
      ContainerContainedStepOrder(comments = comments, container = container(0), contained = contained, flags = flags)
    } else if (overlaps.nonEmpty) {
      OverlapsStepOrder(comments = comments, flags = flags, overlaps = overlaps)
    } else {
      throw ValidationException(s"invalid step order:\n${resource.toTtlString()}", documentPath)
    }
  }

  private def readStepParticipant(resource: Resource): StepParticipant = {
    val id = Uri.parse(resource.getURI)
    StepParticipant(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      entityTypes = Option(resource.entityTypes).filter(_.nonEmpty),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required name property", documentPath)),
      references = Option(resource.reference).filter(_.nonEmpty),
      refvar = resource.refvar.headOption,
      role = resource.role.headOption.getOrElse(throw ValidationException(s"step participant ${id} missing required role property", documentPath))
    )
  }

  private def readStep(resource: Resource): Step = {
    val id = Uri.parse(resource.getURI)
    Step(
      achieves = Option(resource.achieves).filter(_.nonEmpty),
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      maxDuration = resource.maxDuration.map(Duration(_)).headOption,
      minDuration = resource.minDuration.map(Duration(_)).headOption,
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step ${id} missing required name property", documentPath)),
      participants = Option(resource.participants.map(readStepParticipant(_))).filter(_.nonEmpty),
      provenances = Option(resource.provenance).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      requires = Option(resource.requires).filter(_.nonEmpty),
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw ValidationException(s"step ${id} missing type", documentPath)).getURI)
    )
  }

  def read(): SdfDocument = {
    SdfDocument(
      id = id,
      schemas = mapResourcesToObjectJsonNodes(
        jsonNodes = sourceJsonNode.asInstanceOf[ObjectJsonNode].map.get("schemas").map(_.asInstanceOf[ArrayJsonNode].list).getOrElse(List()),
        path = documentPath,
        resources = header.rootResource.schemas
      ).map(entry => readSchema(jsonNode = entry._1, parentPath = documentPath, resource =entry._2)),
      sdfVersion = ZeroDot8cSdfDocumentReader.SdfVersion,
      sourceJson = sourceJson,
      validationMessages = List()
    )
  }
}

object ZeroDot8cSdfDocumentReader {
  val SdfVersion = "0.8c"
}
