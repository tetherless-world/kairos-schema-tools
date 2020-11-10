package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Value(
                        comments: Option[List[String]],
                        confidence: Double,
                        entity: Uri,
                        modalities: Option[List[Modality]],
                        privateData: Option[String],
                        provenances: List[String],
                        sourceJsonNodeLocation: JsonNodeLocation,
                      ) {
}
