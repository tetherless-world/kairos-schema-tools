package models.schema

import edu.rpi.tw.twks.uri.Uri

trait StepOrder {
  val comments: Option[List[String]]
  val flags: Option[List[StepOrderFlag]]
  def stepIds: List[Uri]
}
