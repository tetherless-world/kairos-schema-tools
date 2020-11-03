package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Step(
                       achieves: Option[List[String]],
                       aka: Option[List[String]],
                       comments: Option[List[String]],
                       confidence: Option[Double],
                       id: Uri,
                       maxDuration: Option[Duration],
                       minDuration: Option[Duration],
                       name: String,
                       participants: Option[List[StepParticipant]],
                       path: DefinitionPath,
                       privateData: Option[String],
                       provenances: Option[List[String]],
                       requires: Option[List[String]],
                       references: Option[List[String]],
                       sourceJsonNodeLocation: JsonNodeLocation,
                       ta1ref: Option[Uri],
                       temporalObjects: Option[List[TemporalObject]],
                       `type`: Uri
                     ) extends Definition {
  final override def label = name
}
