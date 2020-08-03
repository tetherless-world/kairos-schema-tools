package models.validation

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class ValidationMessageType(val value: String) extends StringEnumEntry

case object ValidationMessageType extends StringEnum[ValidationMessageType] with StringCirceEnum[ValidationMessageType] {
  case object Fatal extends ValidationMessageType("Fatal")
  case object Error extends ValidationMessageType("Error")
  case object Warning extends ValidationMessageType("Warning")
  val sangriaType = deriveEnumType[ValidationMessageType]()
  val values = findValues
}
