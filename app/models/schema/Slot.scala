package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

trait Slot {
  val aka: Option[List[String]]
  val comments: Option[List[String]]
  val entityTypes: Option[List[EntityType]]
  val id: Uri
  val references: Option[List[String]]
  val sourceJsonNodeLocation: JsonNodeLocation
}
