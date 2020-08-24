package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Primitive(
                      aka: Option[List[String]],
                      comments: Option[List[String]],
                      description: String,
                      id: Uri,
                      maxDuration: Option[Duration],
                      minDuration: Option[Duration],
                      name: String,
                      path: SdfDocumentPath,
                      references: Option[List[String]],
                      slots: List[PrimitiveSlot],
                      sourceJsonNodeLocation: JsonNodeLocation,
                      `super`: Uri,
                      template: Option[String],
                      version: String
) {
  def label = name
}
