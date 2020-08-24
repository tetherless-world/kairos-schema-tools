package models.validation

import models.schema.DefinitionPath

/**
 * An exception used to abort a normal code path while attaching validation messages.
 */
final class ValidationException(val messages: List[ValidationMessage]) extends Exception

object ValidationException {
  def apply(message: String, path: DefinitionPath): ValidationException =
    ValidationException(
      message = message,
      path = path,
      `type` = ValidationMessageType.Error
    )

  def apply(message: String, path: DefinitionPath, `type`: ValidationMessageType): ValidationException =
    ValidationException(
      ValidationMessage(
        message = message,
        path = path,
        `type` = `type`
      )
    )

  def apply(message: ValidationMessage): ValidationException =
    ValidationException(List(message))

  def apply(messages: List[ValidationMessage]): ValidationException =
    new ValidationException(messages)
}
