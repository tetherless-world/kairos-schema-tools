package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelation(
                                 comments: Option[List[String]],
                                 relations: List[EntityRelationRelation],
                                 relationSubject: Uri,
                               )
