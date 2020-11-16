package models.validation

import models.schema.DefinitionPath

final case class ValidationMessage(
                                    message: String,
                                    path: DefinitionPath,
                                    `type`: ValidationMessageType
                                  )
