package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class PrimitiveSlot(
                                aka: Option[List[String]],
                                comments: Option[List[String]],
                                entityTypes: Option[List[EntityType]],
                                id: Uri,
                                path: SdfDocumentPath,
                                references: Option[List[String]],
                                roleName: String,
                                sourceJsonNodeLocation: JsonNodeLocation,
                                `super`: Option[Uri]
                              ) extends Slot {
//  def label = s"${roleName}${entityTypes.map(entityTypes => s" (${entityTypes.map(_.label).mkString(", ")})").getOrElse("")}"
  final override def label = roleName
}
