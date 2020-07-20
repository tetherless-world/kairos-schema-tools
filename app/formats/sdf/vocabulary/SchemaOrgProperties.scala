package formats.sdf.vocabulary

import io.github.tetherlessworld.scena.PropertyGetters

trait SchemaOrgProperties extends PropertyGetters {
  def description: List[String] = getPropertyObjectStrings(SCHEMA_ORG.description)
  def name: List[String] = getPropertyObjectStrings(SCHEMA_ORG.name)
  def version: List[String] = getPropertyObjectStrings(SCHEMA_ORG.version)
}
