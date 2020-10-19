package models.schema

import models.json.JsonNodeLocation

final case class TemporalObject(
                                 absoluteTime: Option[DateTime],
                                 comments: Option[List[String]],
                                 confidence: Double,
                                 duration: Option[Duration],
                                 earliestEndTime: Option[DateTime],
                                 earliestStartTime: Option[DateTime],
                                 label: String,
                                 latestEndTime: Option[DateTime],
                                 latestStartTime: Option[DateTime],
                                 privateData: Option[String],
                                 provenances: Option[List[String]],
                                 sourceJsonNodeLocation: JsonNodeLocation,
                               ) {
}
