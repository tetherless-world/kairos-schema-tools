package models.schema

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class EntityType(val value: String) extends StringEnumEntry

case object EntityType extends StringEnum[EntityType] with StringCirceEnum[EntityType] {
  private val ValueQualifier = "kairos:"

  def apply(qualifiedValue: String): EntityType = {
    val unqualifiedValue =
      if (qualifiedValue.startsWith(ValueQualifier))
        qualifiedValue.substring(ValueQualifier.length)
      else
        throw new IllegalArgumentException(s"invalid entityType ${qualifiedValue}")

    values.find(entityType => entityType.value == unqualifiedValue).getOrElse(throw new IllegalArgumentException(s"unknown entityType ${unqualifiedValue}"))
  }

  case object ABS extends EntityType("ABS")
  case object AML extends EntityType("AML")
  case object BAL extends EntityType("BAL")
  case object COM extends EntityType("COM")
  case object FAC extends EntityType("FAC")
  case object GPE extends EntityType("GPE")
  case object INF extends EntityType("INF")
  case object LOC extends EntityType("LOC")
  case object MON extends EntityType("MON")
  case object ORG extends EntityType("ORG")
  case object PER extends EntityType("PER")
  case object SID extends EntityType("SID")
  case object VEH extends EntityType("VEH")
  case object WEA extends EntityType("WEA")
  val sangriaType = deriveEnumType[EntityType]()
  val values = findValues
}
