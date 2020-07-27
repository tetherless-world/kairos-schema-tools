package models.search

import edu.rpi.tw.twks.uri.Uri

final case class SearchDocument(
                                 id: Uri,
                                 label: String,
                                 sdfDocumentId: Uri,
                                 `type`: SearchDocumentType,
                                 aka: Option[List[String]] = None,
                                 comments: Option[List[String]] = None,
                                 schemaId: Option[Uri] = None,
                                 slotId: Option[Uri] = None,
                                 stepId: Option[Uri] = None
                               )
