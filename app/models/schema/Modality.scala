package models.schema

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class Modality(val value: String) extends StringEnumEntry

case object Modality extends StringEnum[Modality] with StringCirceEnum[Modality] {
  case object Generic extends Modality("generic")
  case object Hedged extends Modality("hedged")
  case object Irrealis extends Modality("irrealis")
  case object Negated extends Modality("negated")
  val sangriaType = deriveEnumType[Modality]()
  val values = findValues
}
