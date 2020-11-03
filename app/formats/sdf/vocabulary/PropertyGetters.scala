package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.RdfListRdfReader
import org.apache.jena.datatypes.xsd.{XSDDateTime, XSDDuration}
import org.apache.jena.rdf.model.{Literal, Property, RDFNode, Resource}
import org.apache.jena.vocabulary.RDF

trait PropertyGetters extends io.github.tetherlessworld.scena.PropertyGetters {
  protected final def getPropertyObjectDateTimes(property: Property) =
    getPropertyObjects(property).filter(_.isLiteral).map(_.asLiteral()).map(_.getValue).filter(_.isInstanceOf[XSDDateTime]).map(_.asInstanceOf[XSDDateTime])

  protected final def getPropertyObjectDoubles(property: Property) =
    getPropertyObjects(property).filter(_.isLiteral).map(_.asLiteral()).map(_.getDouble)

  protected final def getPropertyObjectDurations(property: Property) =
    getPropertyObjects(property).filter(_.isLiteral).map(_.asLiteral()).map(_.getValue).filter(_.isInstanceOf[XSDDuration]).map(_.asInstanceOf[XSDDuration])

  protected final def getPropertyObjectList(property: Property): List[RDFNode] = {
    val propertyObjects = getPropertyObjects(property)
    if (propertyObjects.isEmpty) {
      return List()
    }

    if (propertyObjects.length > 1) {
      // Assume it's not a list
      return propertyObjects
    }

    val propertyObject = propertyObjects(0)
    if (!propertyObject.isResource) {
      return propertyObjects
    }

    val propertyObjectResource = propertyObject.asResource()

    if (propertyObjectResource.getURI == RDF.nil.getURI) {
      // Empty list
      return List()
    }

    val first = Option(propertyObjectResource.getProperty(RDF.first))
    if (!first.isDefined) {
      // Assume it's not a list
      return propertyObjects
    }

    RdfListRdfReader.read(propertyObjectResource)
  }

  protected final def getPropertyObjectLiteralList(property: Property): List[Literal] =
    getPropertyObjectList(property).filter(_.isLiteral).map(_.asLiteral())

  protected final def getPropertyObjectResourceList(property: Property): List[Resource] =
    getPropertyObjectList(property).filter(_.isResource).map(_.asResource())

  protected final def getPropertyObjectUriResourceList(property: Property): List[Resource] =
    getPropertyObjectList(property).filter(_.isURIResource).map(_.asResource())

  protected final def getPropertyObjectResourceParsedUris(property: Property): List[Uri] =
    super.getPropertyObjectResourceUris(property).map(Uri.parse(_))
}
