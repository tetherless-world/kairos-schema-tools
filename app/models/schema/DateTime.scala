package models.schema

import org.apache.jena.datatypes.xsd.{XSDDateTime, XSDDuration}

final case class DateTime(
                           days: Int,
                           fullSeconds: Int,
                           hours: Int,
                           minutes: Int,
                           seconds: Double,
                           months: Int,
                           string: String,
                           years: Int
                         )

object DateTime {
  def apply(dateTime: XSDDateTime): DateTime =
    DateTime(
      days = dateTime.getDays,
      fullSeconds = dateTime.getFullSeconds,
      hours = dateTime.getHours,
      minutes = dateTime.getMinutes,
      seconds = dateTime.getSeconds,
      string = dateTime.toString,
      months = dateTime.getMonths,
      years = dateTime.getYears
    )
}

