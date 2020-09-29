package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class SchemaSlot(
                             aka: Option[List[String]],
                             comments: Option[List[String]],
                             entityTypes: Option[EntityTypes],
                             id: Uri,
                             path: DefinitionPath,
                             privateData: Option[String],
                             references: Option[List[String]],
                             refvar: Option[String],
                             roleName: String,
                             sourceJsonNodeLocation: JsonNodeLocation,
                        ) extends Slot {
//  def label = s"${roleName}${entityTypes.map(entityTypes => s" (${entityTypes.map(_.label).mkString(", ")})").getOrElse("")}"
  final override def label = roleName
}
