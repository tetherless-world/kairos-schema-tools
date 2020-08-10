package formats.json

import org.antlr.v4.runtime.Token

sealed trait JsonNode {
  val startToken: Token
  val stopToken: Token
}

sealed trait ValueJsonNode[T] extends JsonNode {
  val value: T
}

case class ArrayJsonNode(list: List[JsonNode], startToken: Token, stopToken: Token) extends JsonNode

case class BooleanValueJsonNode(startToken: Token, stopToken: Token, value: Boolean) extends ValueJsonNode[Boolean]

case class NullJsonNode(startToken: Token, stopToken: Token) extends JsonNode

case class NumberValueJsonNode(startToken: Token, stopToken: Token, value: Double) extends ValueJsonNode[Double]

case class ObjectJsonNode(map: Map[String, JsonNode], startToken: Token, stopToken: Token) extends JsonNode

case class StringValueJsonNode(startToken: Token, stopToken: Token, value: String) extends ValueJsonNode[String]
