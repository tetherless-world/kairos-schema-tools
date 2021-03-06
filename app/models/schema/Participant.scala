package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Participant(
                              aka: Option[List[String]],
                              comments: Option[List[String]],
                              entityTypes: Option[EntityTypes],
                              id: Uri,
                              name: String, // name is required for step-level slots (participants), unlike schema-level slots
                              path: DefinitionPath,
                              privateData: Option[String],
                              references: Option[List[String]],
                              refvar: Option[String],
                              role: Uri,
                              sourceJsonNodeLocation: JsonNodeLocation,
                              values: Option[List[Value]]
                            ) extends Slot {
  final override def label = {
    val roleParts = role.toString.split('/')
    if (!roleParts(roleParts.length - 1).isEmpty) {
      s"${name} (${roleParts(roleParts.length - 1)})"
    } else {
      name
    }
  }
}
