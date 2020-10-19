package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

trait Definition {
  def label: String
  val id: Uri
  val path: DefinitionPath
  val privateData: Option[String]
  val sourceJsonNodeLocation: JsonNodeLocation
}
