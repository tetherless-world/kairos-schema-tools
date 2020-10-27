package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         confidence: Option[Double],
                                         name: Option[String],
                                         provenances: Option[List[String]],
                                         references: Option[List[String]],
                                         relationPredicate: Uri,
                                         relationObjects: List[Uri]
                                       )
