package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class SchemaSlot(
                          aka: Option[List[String]],
                          comments: Option[List[String]],
                          entityTypes: Option[List[EntityType]],
                          id: Uri,
                          references: Option[List[String]],
                          refvar: Option[String],
                          roleName: String,
                          sourceJsonNodeLocation: JsonNodeLocation,
                        ) {
  def label = s"${roleName}${entityTypes.map(entityTypes => s" (${entityTypes.map(_.label).mkString(", ")})").getOrElse("")}"
}
