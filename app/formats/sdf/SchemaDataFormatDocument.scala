package formats.sdf

import models.schema.Schema
import org.apache.jena.rdf.model.Resource

abstract class SchemaDataFormatDocument(val rootResource: Resource) {
  val schemas: List[Schema]
}
