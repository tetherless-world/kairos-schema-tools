package formats.sdf.versions

import java.io.StringWriter

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{MalformedSchemaDataFormatDocumentException, SdfDocument}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfProperties, RdfReader}
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityType, OverlapsStepOrder, Schema, Slot, Step, StepOrder, StepOrderFlag}
import org.apache.jena.rdf.model.Resource
import org.apache.jena.riot.Lang

import scala.collection.JavaConverters._

final class ZeroDot8aSdfDocumentReader(documentId: Uri, documentResource: Resource, documentSourceJson: String) {
  implicit class SchemaResource(val resource: Resource) extends KairosProperties with SchemaOrgProperties with RdfProperties

  private implicit val slotRdfReader: RdfReader[Slot] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Slot(
      aka = Option(resource.akas).filter(_.nonEmpty),
      comments = Option(resource.comments).filter(_.nonEmpty),
      entityTypes = Option(resource.entityTypes.map(EntityType(_))).filter(_.nonEmpty),
      id = id,
      name = resource.names.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"slot ${id} missing required name property")),
      refvar = resource.refvars.headOption,
      role = resource.roles.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"slot ${id} missing required role property"))
    )
  }

  private implicit val stepOrderRdfReader: RdfReader[StepOrder] = (resource) => {
    val after = resource.after
    val before = resource.before
    val comments = Option(resource.comments).filter(_.nonEmpty)
    val contained = resource.contained
    val container = resource.container
    val flags = Option(resource.flags.map(flagString => StepOrderFlag.values.find(_.value == flagString).getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"unknown step order flag ${flagString}")))).filter(_.nonEmpty)
    val overlaps = resource.overlaps

    def resourceString: String = {
      val resourceStringWriter = new StringWriter()
      resource.listProperties().toModel.write(resourceStringWriter, Lang.TTL.getName)
      resourceStringWriter.toString
    }

    if (after.nonEmpty && before.nonEmpty) {
      BeforeAfterStepOrder(after = after, before = before, comments = comments, flags = flags)
    } else if (contained.nonEmpty && container.size == 1) {
      ContainerContainedStepOrder(comments = comments, container = container(0), contained = contained, flags = flags)
    } else if (overlaps.nonEmpty) {
      OverlapsStepOrder(comments = comments, flags = flags, overlaps = overlaps)
    } else {
      throw new MalformedSchemaDataFormatDocumentException(s"invalid step order:\n${resourceString}")
    }
  }

  private implicit val stepRdfReader: RdfReader[Step] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Step(
      aka = Option(resource.akas).filter(_.nonEmpty),
      comments = Option(resource.comments).filter(_.nonEmpty),
      maxDuration = resource.maxDurations.map(Duration(_)).headOption,
      minDuration = resource.minDurations.map(Duration(_)).headOption,
      id = id,
      name = resource.names.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"step ${id} missing required name property")),
      participants = Option(resource.participants.map(Rdf.read[Slot](_))).filter(_.nonEmpty),
      references = Option(resource.references).filter(_.nonEmpty),
      `type` = Uri.parse(resource.types.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"step ${id} missing type")).getURI)
    )
  }

  private implicit val schemaRdfReader: RdfReader[Schema] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Schema(
      aka = Option(resource.akas).filter(_.nonEmpty),
      comments = Option(resource.comments).filter(_.nonEmpty),
      description = resource.descriptions.headOption.getOrElse(s"schema ${id} missing required description property"),
      id = id,
      name = resource.names.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"schema ${id} missing required name property")),
      order = resource.order.map(resource => Rdf.read[StepOrder](resource)),
      references = Option(resource.references).filter(_.nonEmpty),
      sdfDocumentId = documentId,
      steps = resource.steps.map(resource => Rdf.read[Step](resource)),
      `super` = resource.supers.headOption,
      ta2 = false,
      version = resource.versions.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"schema ${id} missing version property"))
    )
  }

  def read(): SdfDocument = {
    SdfDocument(
      id = documentId,
      schemas = documentResource.schemas.map(resource => Rdf.read[Schema](resource)),
      sdfVersion = ZeroDot8aSdfDocumentReader.SdfVersion,
      sourceJson = documentSourceJson
    )
  }
}

object ZeroDot8aSdfDocumentReader {
  val SdfVersion = "0.8a"
}
