package models.schema

import org.apache.jena.datatypes.xsd.XSDDuration

final case class Duration(
                           days: Int,
                           fullSeconds: Int,
                           hours: Int,
                           minutes: Int,
                           seconds: Double,
                           months: Int,
                           string: String,
                           years: Int
                         )

object Duration {
  def apply(duration: XSDDuration): Duration =
    Duration(
      days = duration.getDays,
      fullSeconds = duration.getFullSeconds,
      hours = duration.getHours,
      minutes = duration.getMinutes,
      seconds = duration.getSeconds,
      string = duration.toString,
      months = duration.getMonths,
      years = duration.getYears
    )
}
