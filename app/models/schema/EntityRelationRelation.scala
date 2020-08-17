package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         name: Option[String],
                                         relationPredicate: Uri,
                                         relationObjects: List[Uri]
                                       )
