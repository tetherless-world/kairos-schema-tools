package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class StepParticipantValue(
                                       comments: Option[List[String]],
                                       confidence: Double,
                                       entity: Uri,
                                       modalities: Option[List[Modality]],
                                       name: String,
                                       privateData: Option[String],
                                       provenances: List[String],
                                       sourceJsonNodeLocation: JsonNodeLocation,
                     ) {
}
