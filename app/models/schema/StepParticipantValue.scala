package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class StepParticipantValue(
                                  comments: Option[List[String]],
                                  confidence: Double,
                                  entityTypes: EntityTypes,
                                  id: Uri,
                                  name: String,
                                  path: DefinitionPath,
                                  privateData: Option[String],
                                  provenance: List[Uri],
                                  sourceJsonNodeLocation: JsonNodeLocation,
                     ) extends Definition {
  final override def label = name
}
