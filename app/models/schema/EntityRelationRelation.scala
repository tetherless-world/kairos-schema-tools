package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelationRelation(
                                         relationPredicate: Uri,
                                         relationObjects: List[Uri]
                                       )
