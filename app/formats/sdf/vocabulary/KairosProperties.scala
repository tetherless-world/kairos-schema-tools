package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.MalformedSchemaDataFormatDocumentException
import models.schema.EntityType
import org.apache.jena.datatypes.xsd.XSDDuration
import org.apache.jena.rdf.model.Resource

trait KairosProperties extends PropertyGetters {
  def achieves: List[String] = getPropertyObjectStrings(KAIROS.achieves)
  def after: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.after)
  def aka: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def before: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.before)
  def comment: List[String] = getPropertyObjectStringList(KAIROS.comment)
  def contained: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.contained)
  def container: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.container)
  def entityRelations: List[Resource] = getPropertyObjectResources(KAIROS.entityRelations)
  def entityTypes: List[EntityType] = getPropertyObjectUriResourceList(KAIROS.entityTypes).map(resource => {
    val uri = Uri.parse(resource.getURI)
    val abbreviation = uri.toString.substring(uri.toString.lastIndexOf('/') + 1)
    EntityType.values.find(_.value == abbreviation).getOrElse(throw new IllegalArgumentException(s"unknown entity type ${abbreviation}"))
  })
  def flags: List[String] = getPropertyObjectStrings(KAIROS.flags)
  def maxDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.maxDuration)
  def minDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.minDuration)
  def order: List[Resource] = getPropertyObjectResources(KAIROS.order)
  def overlaps: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.overlaps)
  def participants: List[Resource] = getPropertyObjectUriResourceList(KAIROS.participants)
  def reference: List[String] = getPropertyObjects(KAIROS.reference).map(node => if (node.isLiteral) node.asLiteral().getString else if (node.isURIResource) node.asResource().getURI else throw new UnsupportedOperationException)
  def relationObject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationObject)
  def relations: List[Resource] = getPropertyObjectResources(KAIROS.relations)
  def relationPredicate: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationPredicate)
  def relationSubject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationSubject)
  def requires: List[String] = getPropertyObjectStrings(KAIROS.requires)
  def refvar: List[String] = getPropertyObjectStrings(KAIROS.refvar)
  def role: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.role)
  def roleName: List[String] = getPropertyObjectStrings(KAIROS.roleName)
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas).filter(resource => resource.isURIResource)
  def slots: List[Resource] = getPropertyObjectUriResourceList(KAIROS.slots)
  def steps: List[Resource] = getPropertyObjectUriResourceList(KAIROS.steps)
  def `super`: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.`super`)
  def sdfVersion: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
}
