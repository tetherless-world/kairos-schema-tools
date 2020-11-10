package models.schema

import edu.rpi.tw.twks.uri.Uri

sealed trait Order {
  val comments: Option[List[String]]
  val confidence: Option[Double]
  val flags: Option[List[OrderFlag]]
  val id: Option[Uri]
  val index: Int

  def label = if (id.isDefined) id.get.toString else index.toString

  val provenances: Option[List[String]]

  def stepIds: List[Uri]

  val ta1ref: Option[Uri]
}

final case class BeforeAfterOrder(
                                   after: List[Uri],
                                   before: List[Uri],
                                   comments: Option[List[String]],
                                   confidence: Option[Double],
                                   flags: Option[List[OrderFlag]],
                                   id: Option[Uri],
                                   index: Int,
                                   provenances: Option[List[String]],
                                   ta1ref: Option[Uri]
                                 ) extends Order {
  final override def stepIds: List[Uri] = after ++ before
}

final case class ContainerContainedOrder(
                                          comments: Option[List[String]],
                                          contained: List[Uri],
                                          container: Uri,
                                          confidence: Option[Double],
                                          flags: Option[List[OrderFlag]],
                                          id: Option[Uri],
                                          index: Int,
                                          provenances: Option[List[String]],
                                          ta1ref: Option[Uri]
                                        ) extends Order {
  final override def stepIds: List[Uri] = contained :+ container
}

final case class OverlapsOrder(
                                comments: Option[List[String]],
                                confidence: Option[Double],
                                flags: Option[List[OrderFlag]],
                                id: Option[Uri],
                                index: Int,
                                overlaps: List[Uri],
                                provenances: Option[List[String]],
                                ta1ref: Option[Uri]
                              ) extends Order {
  final override def stepIds: List[Uri] = overlaps
}
