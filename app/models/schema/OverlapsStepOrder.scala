package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class OverlapsStepOrder(
                                    comments: Option[List[String]],
                                    flags: Option[List[StepOrderFlag]],
                                    overlaps: List[Uri]
                                  ) extends StepOrder {
  final override def stepIds: List[Uri] = overlaps
}
