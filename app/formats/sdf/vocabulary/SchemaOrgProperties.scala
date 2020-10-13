package formats.sdf.vocabulary

trait SchemaOrgProperties extends PropertyGetters {
  def description: List[String] = getPropertyObjectLiteralList(SCHEMA_ORG.description).map(_.getString)
  def name: List[String] = getPropertyObjectStrings(SCHEMA_ORG.name)
  def version: List[String] = getPropertyObjectStrings(SCHEMA_ORG.version)
}
