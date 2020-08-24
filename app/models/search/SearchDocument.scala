package models.search

import edu.rpi.tw.twks.uri.Uri
import models.schema.DefinitionPath

final case class SearchDocument(
                                 id: Uri,
                                 label: String,
                                 `type`: SearchDocumentType,
                                 aka: Option[List[String]] = None,
                                 comments: Option[List[String]] = None,
                                 path: DefinitionPath
                               )
