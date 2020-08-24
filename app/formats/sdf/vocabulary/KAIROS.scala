package formats.sdf.vocabulary

import org.apache.jena.rdf.model.ResourceFactory

object KAIROS {
  val PREFIX = "kairos"
  val URI = "https://kairos-sdf.s3.amazonaws.com/context/kairos/"

  // Properties
  val achieves = ResourceFactory.createProperty(URI + "achieves")
  val after = ResourceFactory.createProperty(URI + "after")
  val aka = ResourceFactory.createProperty(URI + "aka")
  val before = ResourceFactory.createProperty(URI + "before")
  val comment = ResourceFactory.createProperty(URI + "comment")
  val contained = ResourceFactory.createProperty(URI + "contained")
  val container = ResourceFactory.createProperty(URI + "container")
  val entityRelations = ResourceFactory.createProperty(URI + "entityRelations")
  val entityTypes = ResourceFactory.createProperty(URI + "entityTypes")
  val flags = ResourceFactory.createProperty(URI + "flags")
  val maxDuration = ResourceFactory.createProperty(URI + "maxDuration")
  val minDuration = ResourceFactory.createProperty(URI + "minDuration")
  val order = ResourceFactory.createProperty(URI + "order")
  val overlaps = ResourceFactory.createProperty(URI + "overlaps")
  val participants = ResourceFactory.createProperty(URI + "participants")
  val primitives = ResourceFactory.createProperty(URI + "primitives")
  val privateData = ResourceFactory.createProperty(URI + "privateData")
  val provenance = ResourceFactory.createProperty(URI + "provenance")
  val reference = ResourceFactory.createProperty(URI + "reference")
  val refvar = ResourceFactory.createProperty(URI + "refvar")
  val relations = ResourceFactory.createProperty(URI + "relations")
  val relationObject = ResourceFactory.createProperty(URI + "relationObject")
  val relationPredicate = ResourceFactory.createProperty(URI + "relationPredicate")
  val relationSubject = ResourceFactory.createProperty(URI + "relationSubject")
  val requires = ResourceFactory.createProperty(URI + "requires")
  val role = ResourceFactory.createProperty(URI + "role")
  val roleName = ResourceFactory.createProperty(URI + "roleName")
  val schemas = ResourceFactory.createProperty(URI + "schemas")
  val sdfVersion = ResourceFactory.createProperty(URI + "sdfVersion")
  val slots = ResourceFactory.createProperty(URI + "slots")
  val steps = ResourceFactory.createProperty(URI + "steps")
  val `super` = ResourceFactory.createProperty(URI + "super")
  val template = ResourceFactory.createProperty(URI + "template")
}
