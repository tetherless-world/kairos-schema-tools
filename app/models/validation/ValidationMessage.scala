package models.validation

import edu.rpi.tw.twks.uri.Uri
import models.schema.SdfDocumentPath

final case class ValidationMessage(
                                    message: String,
                                    path: SdfDocumentPath,
                                    `type`: ValidationMessageType
                                  )
