package models.schema

import models.json.JsonNodeLocation

final case class StepParticipantValue(
                                       comments: Option[List[String]],
                                       confidence: Double,
                                       entityTypes: EntityTypes,
                                       modalities: Option[List[Modality]],
                                       name: String,
                                       privateData: Option[String],
                                       provenances: List[String],
                                       sourceJsonNodeLocation: JsonNodeLocation,
                     ) {
}
