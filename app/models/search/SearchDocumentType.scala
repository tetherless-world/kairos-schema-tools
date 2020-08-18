package models.search

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class SearchDocumentType(val value: String) extends StringEnumEntry

case object SearchDocumentType extends StringEnum[SearchDocumentType] with StringCirceEnum[SearchDocumentType] {
  case object Primitive extends SearchDocumentType("Primitive")
  case object PrimitiveSlot extends SearchDocumentType("PrimitiveSlot")
  case object Schema extends SearchDocumentType("Schema")
  case object SchemaSlot extends SearchDocumentType("SchemaSlot")
  case object SdfDocument extends SearchDocumentType("SdfDocument")
  case object Step extends SearchDocumentType("Step")
  case object StepParticipant extends SearchDocumentType("StepParticipant")
  val sangriaType = deriveEnumType[SearchDocumentType]()
  val values = findValues
}
