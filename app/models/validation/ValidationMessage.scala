package models.validation

import edu.rpi.tw.twks.uri.Uri
import models.schema.DefinitionPath

final case class ValidationMessage(
                                    message: String,
                                    path: DefinitionPath,
                                    `type`: ValidationMessageType
                                  )
