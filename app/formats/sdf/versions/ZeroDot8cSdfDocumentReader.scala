package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentHeader}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfProperties, RdfReader}
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityRelation, EntityRelationRelation, EntityType, OverlapsStepOrder, Schema, SchemaPath, Slot, Step, StepOrder, StepOrderFlag, StepParticipant}
import models.validation.ValidationException
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

final class ZeroDot8cSdfDocumentReader(documentHeader: SdfDocumentHeader, documentSourceJson: String) {
  private val documentId = documentHeader.id
  private val documentPath = SchemaPath(sdfDocumentId = documentId)

  implicit class SchemaResource(val resource: Resource) extends KairosProperties with SchemaOrgProperties with RdfProperties {
    def toTtlString(): String = {
      val resourceStringWriter = new StringWriter()
      resource.listProperties().toModel.write(resourceStringWriter, Lang.TTL.getName)
      resourceStringWriter.toString
    }
  }

  private implicit val entityRelationRelationRdfReader: RdfReader[EntityRelationRelation] = (resource) =>
    EntityRelationRelation(
      relationObjects = resource.relationObject,
      relationPredicate = resource.relationPredicate.headOption.getOrElse(throw ValidationException(s"entity relation missing relation predicate: ${resource.toTtlString()}", documentPath))
    )

  private implicit val entityRelationRdfReader: RdfReader[EntityRelation] = (resource) =>
    EntityRelation(
      comments = Option(resource.comment).filter(_.nonEmpty),
      relations = resource.relations.map(Rdf.read[EntityRelationRelation](_)),
      relationSubject = resource.relationSubject.headOption.getOrElse(throw ValidationException(s"entity relation missing subject: ${resource.toTtlString()}", documentPath))
    )

  private implicit val slotRdfReader: RdfReader[Slot] = (resource) => {
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

  private implicit val stepOrderRdfReader: RdfReader[StepOrder] = (resource) => {
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

  private implicit val stepParticipantRdfReader: RdfReader[StepParticipant] = (resource) => {
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

  private implicit val stepRdfReader: RdfReader[Step] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Step(
      achieves = Option(resource.achieves).filter(_.nonEmpty),
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      maxDuration = resource.maxDuration.map(Duration(_)).headOption,
      minDuration = resource.minDuration.map(Duration(_)).headOption,
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"step ${id} missing required name property", documentPath)),
      participants = Option(resource.participants.map(Rdf.read[StepParticipant](_))).filter(_.nonEmpty),
      provenances = Option(resource.provenance).filter(_.nonEmpty),
      references = Option(resource.reference).filter(_.nonEmpty),
      requires = Option(resource.requires).filter(_.nonEmpty),
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw ValidationException(s"step ${id} missing type", documentPath)).getURI)
    )
  }

  private implicit val schemaRdfReader: RdfReader[Schema] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Schema(
      aka = Option(resource.aka).filter(_.nonEmpty),
      comments = Option(resource.comment).filter(_.nonEmpty),
      description = resource.description.headOption.getOrElse(s"schema ${id} missing required description property"),
      entityRelations = resource.entityRelations.map(Rdf.read[EntityRelation](_)),
      id = id,
      name = resource.name.headOption.getOrElse(throw ValidationException(s"schema ${id} missing required name property", documentPath)),
      order = resource.order.map(resource => Rdf.read[StepOrder](resource)),
      references = Option(resource.reference).filter(_.nonEmpty),
      sdfDocumentId = documentId,
      slots = resource.slots.map(resource => Rdf.read[Slot](resource)),
      steps = resource.steps.map(resource => Rdf.read[Step](resource)),
      `super` = resource.`super`.headOption,
      ta2 = false,
      version = resource.version.headOption.getOrElse(throw ValidationException(s"schema ${id} missing version property", documentPath))
    )
  }

  def read(): SdfDocument = {
    SdfDocument(
      id = documentId,
      schemas = documentHeader.rootResource.schemas.map(Rdf.read[Schema](_)),
      sdfVersion = ZeroDot8cSdfDocumentReader.SdfVersion,
      sourceJson = documentSourceJson,
      validationMessages = List()
    )
  }
}

object ZeroDot8cSdfDocumentReader {
  val SdfVersion = "0.8c"
}
