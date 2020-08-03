package models.validation

import models.schema.SchemaPath

/**
 * An exception used to abort a normal code path while attaching validation messages.
 */
final class ValidationException(val messages: List[ValidationMessage]) extends Exception

object ValidationException {
  def apply(message: String, path: SchemaPath): ValidationException =
    ValidationException(
      message = message,
      path = path,
      `type` = ValidationMessageType.Error
    )

  def apply(message: String, path: SchemaPath, `type`: ValidationMessageType): ValidationException =
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
