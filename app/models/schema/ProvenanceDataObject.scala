package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class ProvenanceDataObject(
                                       childId: String,
                                       boundingBox: Option[List[Int]],
                                       comments: Option[List[String]],
                                       endTime: Option[DateTime],
                                       id: Uri,
                                       keyframes: Option[List[Int]],
                                       label: String,
                                       length: Option[Int],
                                       mediaType: String,
                                       offset: Option[Int],
                                       parentIds: Option[List[String]],
                                       path: DefinitionPath,
                                       privateData: Option[String],
                                       sourceJsonNodeLocation: JsonNodeLocation,
                                       startTime: Option[DateTime]
                                     ) extends Definition {
}
