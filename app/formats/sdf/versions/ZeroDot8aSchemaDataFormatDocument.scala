package formats.sdf.versions

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{MalformedSchemaDataFormatDocumentException, SchemaDataFormatDocument}
import formats.sdf.vocabulary.{KAIROS, KairosProperties, SCHEMA_ORG, SchemaOrgProperties}
import io.github.tetherlessworld.scena.{Rdf, RdfReader}
import models.schema.Schema
import org.apache.jena.rdf.model.Resource

import scala.collection.JavaConverters._

final class ZeroDot8aSchemaDataFormatDocument(rootResource: Resource) extends SchemaDataFormatDocument(rootResource) {
  implicit class SchemaResource(val resource: Resource) extends KairosProperties with SchemaOrgProperties

  private implicit val schemaRdfReader: RdfReader[Schema] = (resource) => {
    val id = Uri.parse(resource.getURI)
    Schema(
      aka = Option(resource.akas).filter(_.nonEmpty),
      comments = Option(resource.comments).filter(_.nonEmpty),
      description = resource.descriptions.headOption.getOrElse(s"schema ${id} missing required description property"),
      id = id,
      name = resource.names.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"schema ${id} missing required name property")),
      references = Option(resource.references).filter(_.nonEmpty),
      `super` = resource.supers.headOption,
      ta2 = false,
      version = resource.versions.headOption.getOrElse(throw new MalformedSchemaDataFormatDocumentException(s"schema ${id} missing version property"))
    )
  }

  private val schemasRdfReader: RdfReader[List[Schema]] = (resource) =>
    resource.schemas.map(resource => Rdf.read[Schema](resource))

  val schemas = schemasRdfReader.read(rootResource)
}
