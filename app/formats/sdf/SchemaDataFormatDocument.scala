package formats.sdf

import models.schema.Schema
import org.apache.jena.rdf.model.Resource

final case class SchemaDataFormatDocument(schemas: List[Schema], sdfVersion: String)
