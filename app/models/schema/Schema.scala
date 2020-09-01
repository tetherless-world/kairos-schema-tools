package models.schema

import edu.rpi.tw.twks.uri.Uri
import models.json.JsonNodeLocation

final case class Schema(
                         aka: Option[List[String]],
                         comments: Option[List[String]],
                         description: String,
                         entityRelations: List[EntityRelation],
                         id: Uri,
                         name: String,
                         order: List[StepOrder],
                         references: Option[List[String]],
                         path: DefinitionPath,
                         privateData: Option[String],
                         slots: List[SchemaSlot],
                         sourceJsonNodeLocation: JsonNodeLocation,
                         steps: List[Step],
                         ta2: Boolean,
                         template: Option[String],
                         version: String
) extends Definition {
  final override def label = name
}
