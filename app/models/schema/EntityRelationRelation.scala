package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         relationPredicate: String,
                                         relationObjects: List[Uri]
                                       )
