package models.json

sealed trait JsonNode {
  val location: JsonNodeLocation
}

sealed trait ValueJsonNode[T] extends JsonNode {
  val value: T
}

case class ArrayJsonNode(list: List[JsonNode], location: JsonNodeLocation) extends JsonNode

case class BooleanValueJsonNode(location: JsonNodeLocation, value: Boolean) extends ValueJsonNode[Boolean]

case class NullJsonNode(location: JsonNodeLocation) extends JsonNode

case class NumberValueJsonNode(location: JsonNodeLocation, value: Double) extends ValueJsonNode[Double]

case class ObjectJsonNode(map: Map[String, JsonNode], location: JsonNodeLocation, text: String) extends JsonNode

case class StringValueJsonNode(location: JsonNodeLocation, value: String) extends ValueJsonNode[String]
