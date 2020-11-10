package models.schema

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class OrderFlag(val value: String) extends StringEnumEntry

case object OrderFlag extends StringEnum[OrderFlag] with StringCirceEnum[OrderFlag] {
  case object Causal extends OrderFlag("causal")
  case object Optional extends OrderFlag("optional")
  case object Precondition extends OrderFlag("precondition")
  case object Simultaneous extends OrderFlag("simultaneous")
  case object Subevent extends OrderFlag("subevent")
  val sangriaType = deriveEnumType[OrderFlag]()
  val values = findValues
}
