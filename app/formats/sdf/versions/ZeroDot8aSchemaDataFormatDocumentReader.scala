package formats.sdf.versions

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{MalformedSchemaDataFormatDocumentException, SchemaDataFormatDocument}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfProperties, RdfReader}
import models.schema.{Duration, EntityType, Schema, Slot, Step}
import org.apache.jena.rdf.model.Resource

import scala.collection.JavaConverters._

object ZeroDot8aSchemaDataFormatDocumentReader extends RdfReader[SchemaDataFormatDocument] {
  val SdfVersion = "0.8a"

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
      references = Option(resource.references).filter(_.nonEmpty),
      steps = resource.steps.map(resource => Rdf.read[Step](resource)),
      `super` = resource.supers.headOption,
      ta2 = false,
      version = resource.versions.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"schema ${id} missing version property"))
    )
  }

  private val schemasRdfReader: RdfReader[List[Schema]] = (resource) =>
    resource.schemas.map(resource => Rdf.read[Schema](resource))

  override def read(resource: Resource): SchemaDataFormatDocument = {
    SchemaDataFormatDocument(
      schemas = schemasRdfReader.read(resource),
      sdfVersion = SdfVersion
    )
  }
}
