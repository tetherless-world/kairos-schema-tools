package formats.sdf.vocabulary

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.UriParseException
import models.schema.EntityType
import models.validation.ValidationException
import org.apache.jena.datatypes.xsd.{XSDDateTime, XSDDuration}
import org.apache.jena.rdf.model.Resource

trait KairosProperties extends PropertyGetters {
  private def parseUri(uri: String): Uri = {
    try {
      Uri.parse(uri)
    } catch {
      case e: NullPointerException => throw new UriParseException(e)
    }
  }

  def absoluteTime: List[XSDDateTime] = getPropertyObjectDateTimes(KAIROS.absoluteTime)
  def achieves: List[String] = getPropertyObjectStrings(KAIROS.achieves)
  def after: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.after)
  def aka: List[String] = getPropertyObjectStrings(KAIROS.aka)
  def before: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.before)
  def boundingBox: List[Int] = getPropertyObjectLiteralList(KAIROS.boundingBox).map(_.getInt)
  def childId: List[String] = getPropertyObjectStrings(KAIROS.childId)
  def comment: List[String] = getPropertyObjectLiteralList(KAIROS.comment).map(_.getString)
  def confidence: List[Double] = getPropertyObjectDoubles(KAIROS.confidence)
  def contained: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.contained)
  def container: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.container)
  def duration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.duration)
  def earliestEndTime: List[XSDDateTime] = getPropertyObjectDateTimes(KAIROS.earliestEndTime)
  def earliestStartTime: List[XSDDateTime] = getPropertyObjectDateTimes(KAIROS.earliestStartTime)
  def endTime: List[Double] = getPropertyObjectDoubles(KAIROS.endTime)
  def entityRelations: List[Resource] = getPropertyObjectResources(KAIROS.entityRelations)
  def entityTypes: List[Uri] = getPropertyObjectUriResourceList(KAIROS.entityTypes).map(resource => parseUri(resource.getURI))
  def entityTypes_AND: List[Uri] = getPropertyObjectUriResourceList(KAIROS.entityTypes_AND).map(resource => parseUri(resource.getURI))
  def entityTypes_OR: List[Uri] = getPropertyObjectUriResourceList(KAIROS.entityTypes_OR).map(resource => parseUri(resource.getURI))
  def keyframes: List[Int] = getPropertyObjectInts(KAIROS.keyframes)
  def flags: List[String] = getPropertyObjectStrings(KAIROS.flags)
  def latestEndTime: List[XSDDateTime] = getPropertyObjectDateTimes(KAIROS.latestEndTime)
  def latestStartTime: List[XSDDateTime] = getPropertyObjectDateTimes(KAIROS.latestStartTime)
  def length: List[Int] = getPropertyObjectInts(KAIROS.length)
  def maxDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.maxDuration)
  def mediaType: List[String] = getPropertyObjectStrings(KAIROS.mediaType)
  def minDuration: List[XSDDuration] = getPropertyObjectDurations(KAIROS.minDuration)
  def offset: List[Int] = getPropertyObjectInts(KAIROS.offset)
  def order: List[Resource] = getPropertyObjectResources(KAIROS.order)
  def overlaps: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.overlaps)
  def parentIds: List[String] = getPropertyObjectStrings(KAIROS.parentIds)
  def participants: List[Resource] = getPropertyObjectUriResourceList(KAIROS.participants)
  def primitives: List[Resource] = getPropertyObjectResources(KAIROS.primitives).filter(resource => resource.isURIResource)
  def provenance: List[String] = getPropertyObjectStrings(KAIROS.provenance)
  def provenanceData: List[Resource] = getPropertyObjectResources(KAIROS.provenanceData)
  def reference: List[String] = getPropertyObjects(KAIROS.reference).map(node => if (node.isLiteral) node.asLiteral().getString else if (node.isURIResource) node.asResource().getURI else throw new UnsupportedOperationException)
  def relationObject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationObject)
  def relations: List[Resource] = getPropertyObjectResources(KAIROS.relations)
  def relationPredicate: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationPredicate)
  def relationProvenance: List[String] = getPropertyObjectStrings(KAIROS.relationProvenance)
  def relationSubject: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.relationSubject)
  def requires: List[String] = getPropertyObjectStrings(KAIROS.requires)
  def refvar: List[String] = getPropertyObjectStrings(KAIROS.refvar)
  def role: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.role)
  def roleName: List[String] = getPropertyObjectStrings(KAIROS.roleName)
  def schemas: List[Resource] = getPropertyObjectResources(KAIROS.schemas).filter(resource => resource.isURIResource)
  def slots: List[Resource] = getPropertyObjectUriResourceList(KAIROS.slots)
  def startTime: List[Double] = getPropertyObjectDoubles(KAIROS.startTime)
  def steps: List[Resource] = getPropertyObjectUriResourceList(KAIROS.steps)
  def `super`: List[Uri] = getPropertyObjectResourceParsedUris(KAIROS.`super`)
  def sdfVersion: List[String] = getPropertyObjectStrings(KAIROS.sdfVersion)
  def ta2: Option[Boolean] = getPropertyObjectLiterals(KAIROS.ta2).headOption.map(_.getBoolean)
  def task2: Option[Boolean] = getPropertyObjectLiterals(KAIROS.task2).headOption.map(_.getBoolean)
  def template: List[String] = getPropertyObjectStrings(KAIROS.template)
  def temporal: List[Resource] = getPropertyObjectResources(KAIROS.temporal)
  def values: List[Resource] = getPropertyObjectResources(KAIROS.values)
}
