package formats.vocabulary

import org.apache.jena.rdf.model.ResourceFactory

object SCHEMA {
  val PREFIX = "schema"
  val URI = "http://schema.org/"

  // Properties
  val description = ResourceFactory.createProperty(URI + "description")
  val name = ResourceFactory.createProperty(URI + "name")
  val version = ResourceFactory.createProperty(URI + "version")
}
