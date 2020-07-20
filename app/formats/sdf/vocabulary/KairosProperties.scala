package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{MalformedSchemaDataFormatDocumentException, RdfListRdfReader}
import formats.sdf.RdfListRdfReader.read
import io.github.tetherlessworld.scena.PropertyGetters
import org.apache.jena.datatypes.xsd.XSDDuration
import org.apache.jena.rdf.model.{Property, Resource}
import org.apache.jena.vocabulary.RDF

trait KairosProperties extends PropertyGetters {
  private def getPropertyObjectDurations(property: Property) =
    getPropertyObjects(property).filter(_.isLiteral).map(_.asLiteral()).map(_.getValue).filter(_.isInstanceOf[XSDDuration]).map(_.asInstanceOf[XSDDuration])

  private def getPropertyObjectStringList(property: Property): List[String] =
    getPropertyObjects(property).flatMap(propertyObject => {
      if (propertyObject.isLiteral) {
        List(propertyObject.asLiteral().getString)
      } else if (propertyObject.isResource) {
        RdfListRdfReader.read(propertyObject.asResource()).filter(_.isLiteral).map(_.asLiteral().getString)
      } else {
        List()
      }
    })

  private def getPropertyObjectResourceParsedUris(property: Property): List[Uri] =
    super.getPropertyObjectResourceUris(property).map(Uri.parse(_))

  def after: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.after)
  def aka: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def before: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.before)
  def comment: List[String] = getPropertyObjectStringList(KAIROS.comment)
  def contained: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.contained)
  def container: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.container)
  def entityRelations: List[Resource] = getPropertyObjectResources(KAIROS.entityRelations)
  def entityTypes: List[String] = getPropertyObjectStrings(KAIROS.entityTypes)
  def flags: List[String] = getPropertyObjectStrings(KAIROS.flags)
  def maxDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.maxDuration)
  def minDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.minDuration)
  def order: List[Resource] = getPropertyObjectResources(KAIROS.order)
  def overlaps: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.overlaps)
  def participants: List[Resource] = getPropertyObjectResources(KAIROS.participants)
  def reference: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.reference)
  def relationObject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationObject)
  def relations: List[Resource] = getPropertyObjectResources(KAIROS.relations)
  def relationPredicate: List[String] = getPropertyObjectStrings(KAIROS.relationPredicate)
  def relationSubject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationSubject)
  def refvar: List[String] = getPropertyObjectStrings(KAIROS.refvar)
  def role: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.role)
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas).filter(resource => resource.isURIResource)
  def steps: List[Resource] = getPropertyObjectResources(KAIROS.steps).filter(resource => resource.isURIResource)
  def `super`: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.`super`)
  def sdfVersion: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
}
