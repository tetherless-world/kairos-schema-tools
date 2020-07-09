package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class Slot(
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       entityTypes: Option[List[EntityType]],
                       id: Uri,
                       name: String,
                       refvar: Option[String],
                       role: Uri
                     )
