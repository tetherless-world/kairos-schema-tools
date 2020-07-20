package models.schema

import edu.rpi.tw.twks.uri.Uri

case class Schema(
  aka: Option[List[String]],
  comments: Option[List[String]],
  description: String,
  entityRelations: List[EntityRelation],
  id: Uri,
  name: String,
  order: List[StepOrder],
  references: Option[List[String]],
  sdfDocumentId: Uri,
  slots: List[Slot],
  steps: List[Step],
  `super`: Option[Uri],
  ta2: Boolean,
  version: String
)
