package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class ContainerContainedStepOrder(
                                              comments: Option[List[String]],
                                              contained: List[Uri],
                                              container: Uri,
                                              flags: Option[List[StepOrderFlag]]
                                            ) extends StepOrder {
  final override def stepIds: List[Uri] = contained :+ container
}
