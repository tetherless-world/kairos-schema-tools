package models.schema

import edu.rpi.tw.twks.uri.Uri

sealed trait StepOrder {
  val comments: Option[List[String]]
  val confidence: Option[Double]
  val flags: Option[List[StepOrderFlag]]
  val provenances: Option[List[String]]
  def stepIds: List[Uri]
}

final case class BeforeAfterStepOrder(
                                       after: List[Uri],
                                       before: List[Uri],
                                       comments: Option[List[String]],
                                       confidence: Option[Double],
                                       flags: Option[List[StepOrderFlag]],
                                       provenances: Option[List[String]]
                                     ) extends StepOrder {
  final override def stepIds: List[Uri] = after ++ before
}

final case class ContainerContainedStepOrder(
                                              comments: Option[List[String]],
                                              contained: List[Uri],
                                              container: Uri,
                                              confidence: Option[Double],
                                              flags: Option[List[StepOrderFlag]],
                                              provenances: Option[List[String]]
                                            ) extends StepOrder {
  final override def stepIds: List[Uri] = contained :+ container
}

final case class OverlapsStepOrder(
                                    comments: Option[List[String]],
                                    confidence: Option[Double],
                                    flags: Option[List[StepOrderFlag]],
                                    overlaps: List[Uri],
                                    provenances: Option[List[String]]
                                  ) extends StepOrder {
  final override def stepIds: List[Uri] = overlaps
}
