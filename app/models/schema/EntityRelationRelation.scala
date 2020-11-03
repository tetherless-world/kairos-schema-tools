package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         confidence: Option[Double],
                                         id: Option[Uri],
                                         index: Int,
                                         modalities: Option[List[Modality]],
                                         name: Option[String],
                                         provenances: Option[List[String]],
                                         references: Option[List[String]],
                                         relationPredicate: Uri,
                                         relationProvenance: Option[String],
                                         relationObjects: List[Uri],
                                         ta1ref: Option[Uri]
                                       )
