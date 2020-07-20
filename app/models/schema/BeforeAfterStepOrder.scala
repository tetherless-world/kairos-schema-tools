package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class BeforeAfterStepOrder(
                                       after: List[Uri],
                                       before: List[Uri],
                                       comments: Option[List[String]],
                                       flags: Option[List[StepOrderFlag]]
                                     ) extends StepOrder {
  final override def stepIds: List[Uri] = after ++ before
}
