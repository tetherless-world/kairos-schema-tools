package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class Step(
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       id: Uri,
                       maxDuration: Option[Duration],
                       minDuration: Option[Duration],
                       name: String,
                       participants: Option[List[Slot]],
                       references: Option[List[Uri]],
                       `type`: Uri
                     )
