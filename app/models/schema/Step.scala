package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class Step(
                       achieves: Option[List[String]],
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       id: Uri,
                       maxDuration: Option[Duration],
                       minDuration: Option[Duration],
                       name: String,
                       participants: Option[List[StepParticipant]],
                       provenances: Option[List[String]],
                       requires: Option[List[String]],
                       references: Option[List[String]],
                       `type`: Uri
                     )
