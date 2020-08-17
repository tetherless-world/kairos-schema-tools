package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

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
  sourceJsonNodeLocation: JsonNodeLocation,
  steps: List[Step],
  `super`: Option[Uri],
  ta2: Boolean,
  template: Option[String],
  version: String
) {
  def label = name
}
