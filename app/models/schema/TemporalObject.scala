package models.schema

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
                               // Currently (20201019) we can't get the JSON object for a temporal object because the container is unordered.
                               // We need the JSON object to get privateData.
//                                 privateData: Option[String],
                                 provenances: Option[List[String]]
                               )
