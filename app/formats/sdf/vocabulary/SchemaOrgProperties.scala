package formats.sdf.vocabulary

trait SchemaOrgProperties extends PropertyGetters {
  def description: List[String] = getPropertyObjectStringList(SCHEMA_ORG.description)
  def name: List[String] = getPropertyObjectStrings(SCHEMA_ORG.name)
  def version: List[String] = getPropertyObjectStrings(SCHEMA_ORG.version)
}
