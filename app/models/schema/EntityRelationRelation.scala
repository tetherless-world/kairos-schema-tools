package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         confidence: Option[Double],
                                         name: Option[String],
                                         relationPredicate: Uri,
                                         relationObjects: List[Uri]
                                       )
