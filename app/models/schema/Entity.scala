package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Entity(
                       comments: Option[List[String]],
                       entityTypes: EntityTypes,
                       id: Uri,
                       name: String,
                       path: DefinitionPath,
                       privateData: Option[String],
                       references: Option[List[String]],
                       refvar: Option[String],
                       sourceJsonNodeLocation: JsonNodeLocation
                     ) extends Definition {
  final override def label = name
}
