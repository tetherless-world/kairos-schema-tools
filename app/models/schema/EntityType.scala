package models.schema

import enumeratum.values.{StringCirceEnum, StringEnum, StringEnumEntry}
import sangria.macros.derive.deriveEnumType

sealed abstract class EntityType(val label: String, val value: String) extends StringEnumEntry {
}

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

  // Labels are documented in the entities tab of the KAIROS Annotation Tagset.
  case object ABS extends EntityType(label = "Abstract artifact (ABS)", value = "ABS")
  case object AML extends EntityType(label = "Animal (AML)", value = "AML")
  case object BAL extends EntityType(label = "Ballot (BAL)", value = "BAL")
  case object BOD extends EntityType(label = "Body part (BOD)", value = "BOD")
  case object COM extends EntityType(label = "Commercial product (COM)", value = "COM")
  case object FAC extends EntityType(label = "Facility (FAC)", value = "FAC")
  case object GPE extends EntityType(label = "Geopolitical entity (GPE)", value = "GPE")
  case object INF extends EntityType(label = "Information object (INF)", value = "INF")
  case object LAW extends EntityType(label = "Law (LAW)", value = "LAW")
  case object LOC extends EntityType(label = "Location (LOC)", value = "LOC")
  case object MHI extends EntityType(label = "Medical condition (MHI)", value = "MHI")
  case object MON extends EntityType(label = "Monetary payment (MON)", value = "MON")
  case object NAT extends EntityType(label = "Natural resources (NAT)", value = "NAT")
  case object ORG extends EntityType(label = "Organization (ORG)", value = "ORG")
  case object PER extends EntityType(label = "Person (PER)", value = "PER")
  case object PLA extends EntityType(label = "Place (PLA)", value = "PLA")
  case object PTH extends EntityType(label = "Infectious agent (PTH)", value = "PTH")
  case object RES extends EntityType(label = "Voting results (RES)", value = "RES")
  case object SEN extends EntityType(label = "Judicial sentence (SEN)", value = "SEN")
  case object SID extends EntityType(label = "Side of a conflict (SID)", value = "SID")
  case object TTL extends EntityType(label = "Personal title (TTL)", value = "TTL")
  case object VAL extends EntityType(label = "Value (VAL)", value = "VAL")
  case object VEH extends EntityType(label = "Vehicle (VEH)", value = "VEH")
  case object WEA extends EntityType(label = "Wearable device (WEA)", value = "WEA")
  val sangriaType = deriveEnumType[EntityType]()
  val values = findValues
}
