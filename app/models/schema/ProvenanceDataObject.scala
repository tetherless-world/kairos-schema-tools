package models.schema

import models.json.JsonNodeLocation

final case class ProvenanceDataObject(
                                       childId: String,
                                       boundingBox: Option[List[Int]],
                                       comments: Option[List[String]],
                                       endTime: Option[Double],
                                       id: String,
                                       keyframes: Option[List[Int]],
                                       length: Option[Int],
                                       mediaType: String,
                                       offset: Option[Int],
                                       parentIds: Option[List[String]],
                                       path: DefinitionPath,
                                       privateData: Option[String],
                                       sourceJsonNodeLocation: JsonNodeLocation,
                                       startTime: Option[Double]
                                     ) {
  final def label = id
}
