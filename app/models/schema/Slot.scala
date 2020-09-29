package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

trait Slot extends Definition {
  val aka: Option[List[String]]
  val comments: Option[List[String]]
  val entityTypes: Option[EntityTypes]
  val id: Uri
  val path: DefinitionPath
  val references: Option[List[String]]
  val sourceJsonNodeLocation: JsonNodeLocation
}
