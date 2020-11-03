package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class EntityRelation(
                                 comments: Option[List[String]],
                                 confidence: Option[Double],
                                 id: Option[Uri],
                                 index: Int,
                                 modalities: Option[List[Modality]],
                                 name: Option[String],
                                 provenances: Option[List[String]],
                                 references: Option[List[String]],
                                 predicate: Uri,
                                 relationProvenance: Option[String],
                                 `object`: Uri,
                                 subject: Uri,
                                 ta1ref: Option[Uri]
                               )
