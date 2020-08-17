package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class StepParticipant(
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       entityTypes: Option[List[EntityType]],
                       id: Uri,
                       name: String, // name is required for step-level slots (participants), unlike top-level slots
                       references: Option[List[String]],
                       refvar: Option[String],
                       role: Uri,
                       sourceJsonNodeLocation: JsonNodeLocation,
                     ) {
  def label = name
}
