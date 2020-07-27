package models.search

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class SearchDocumentType(val value: String) extends StringEnumEntry

case object SearchDocumentType extends StringEnum[SearchDocumentType] with StringCirceEnum[SearchDocumentType] {
  case object Schema extends SearchDocumentType("Schema")
  case object SdfDocument extends SearchDocumentType("SdfDocument")
  case object Slot extends SearchDocumentType("Slot")
  case object Step extends SearchDocumentType("Step")
  val sangriaType = deriveEnumType[SearchDocumentType]()
  val values = findValues
}
