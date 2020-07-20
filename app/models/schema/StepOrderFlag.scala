package models.schema

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class StepOrderFlag(val value: String) extends StringEnumEntry

case object StepOrderFlag extends StringEnum[StepOrderFlag] with StringCirceEnum[StepOrderFlag] {
  case object Causal extends StepOrderFlag("causal")
  case object Optional extends StepOrderFlag("optional")
  case object Precondition extends StepOrderFlag("precondition")
  case object Simultaneous extends StepOrderFlag("simultaneous")
  case object Subevent extends StepOrderFlag("subevent")
  val sangriaType = deriveEnumType[StepOrderFlag]()
  val values = findValues
}
