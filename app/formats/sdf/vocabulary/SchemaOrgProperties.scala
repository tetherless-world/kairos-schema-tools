package formats.sdf.vocabulary

import io.github.tetherlessworld.scena.PropertyGetters

trait SchemaOrgProperties extends PropertyGetters {
  def descriptions: List[String] = getPropertyObjectStrings(SCHEMA_ORG.description)
  def names: List[String] = getPropertyObjectStrings(SCHEMA_ORG.name)
  def versions: List[String] = getPropertyObjectStrings(SCHEMA_ORG.version)
}
