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
  def akas: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def before: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.before)
  def comments: List[String] = getPropertyObjectStringList(KAIROS.comment)
  def contained: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.contained)
  def container: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.container)
  def entityTypes: List[String] = getPropertyObjectStrings(KAIROS.entityTypes)
  def flags: List[String] = getPropertyObjectStrings(KAIROS.flags)
  def maxDurations: List[XSDDuration] = getPropertyObjectDurations(KAIROS.maxDuration)
  def minDurations: List[XSDDuration] = getPropertyObjectDurations(KAIROS.minDuration)
  def order: List[Resource] = getPropertyObjectResources(KAIROS.order)
  def overlaps: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.overlaps)
  def participants: List[Resource] = getPropertyObjectResources(KAIROS.participants)
  def references: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.reference)
  def refvars: List[String] = getPropertyObjectStrings(KAIROS.refvar)
  def roles: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.role)
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas).filter(resource => resource.isURIResource)
  def steps: List[Resource] = getPropertyObjectResources(KAIROS.steps).filter(resource => resource.isURIResource)
  def supers: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.`super`)
  def sdfVersions: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
}
