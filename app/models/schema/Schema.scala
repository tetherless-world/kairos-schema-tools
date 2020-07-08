package models.schema

import edu.rpi.tw.twks.uri.Uri

case class Schema(
  aka: Option[List[String]],
  comments: Option[List[String]],
  description: String,
  id: Uri,
  name: String,
  references: Option[List[Uri]],
  steps: List[Step],
  `super`: Option[Uri],
  ta2: Boolean,
  version: String
)
