package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class Step(
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       id: Uri,
                       maxDuration: Option[Duration],
                       minDuration: Option[Duration],
                       name: String,
                       participants: Option[List[StepParticipant]],
                       references: Option[List[String]],
                       `type`: Uri
                     )
