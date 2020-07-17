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

  def akas: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def comments: List[String] = getPropertyObjectStringList(KAIROS.comment)
  def entityTypes: List[String] = getPropertyObjectStrings(KAIROS.entityTypes)
  def maxDurations: List[XSDDuration] = getPropertyObjectDurations(KAIROS.maxDuration)
  def minDurations: List[XSDDuration] = getPropertyObjectDurations(KAIROS.minDuration)
  def participants: List[Resource] = getPropertyObjectResources(KAIROS.participants)
  def references: List[Uri] = getPropertyObjectResourceUris(KAIROS.reference).map(Uri.parse(_))
  def refvars: List[String] = getPropertyObjectStrings(KAIROS.refvar)
  def roles: List[Uri] = getPropertyObjectResourceUris(KAIROS.role).map(Uri.parse(_))
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas).filter(resource => resource.isURIResource)
  def steps: List[Resource] = getPropertyObjectResources(KAIROS.steps).filter(resource => resource.isURIResource)
  def supers: List[Uri] = getPropertyObjectResourceUris(KAIROS.`super`).map(Uri.parse(_))
  def sdfVersions: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
}
