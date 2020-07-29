package models.validation

import edu.rpi.tw.twks.uri.Uri
import models.schema.SchemaPath

final case class ValidationMessage(
                                    message: String,
                                    path: SchemaPath,
                                    `type`: ValidationMessageType
                                  )
