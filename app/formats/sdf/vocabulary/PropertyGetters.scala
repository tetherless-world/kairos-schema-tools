package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.RdfListRdfReader
import org.apache.jena.datatypes.xsd.XSDDuration
import org.apache.jena.rdf.model.{Property, Resource}

trait PropertyGetters extends io.github.tetherlessworld.scena.PropertyGetters {
  protected final def getPropertyObjectDurations(property: Property) =
    getPropertyObjects(property).filter(_.isLiteral).map(_.asLiteral()).map(_.getValue).filter(_.isInstanceOf[XSDDuration]).map(_.asInstanceOf[XSDDuration])

  protected final def getPropertyObjectStringList(property: Property): List[String] =
    getPropertyObjects(property).flatMap(propertyObject => {
      if (propertyObject.isLiteral) {
        List(propertyObject.asLiteral().getString)
      } else if (propertyObject.isResource) {
        RdfListRdfReader.read(propertyObject.asResource()).filter(_.isLiteral).map(_.asLiteral().getString)
      } else {
        List()
      }
    })

  protected final def getPropertyObjectUriResourceList(property: Property): List[Resource] = {
    val resources = getPropertyObjectResources(property)
    if (resources.size == 1 && !resources(0).isURIResource) {
      RdfListRdfReader.read(resources(0)).filter(node => node.isURIResource).map(node => node.asResource())
    } else {
      resources
    }
  }

  protected final def getPropertyObjectResourceParsedUris(property: Property): List[Uri] =
    super.getPropertyObjectResourceUris(property).map(Uri.parse(_))
}
