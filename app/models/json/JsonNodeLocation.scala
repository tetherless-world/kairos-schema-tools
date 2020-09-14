package models.json

import org.antlr.v4.runtime.Token

final case class JsonNodeLocation(startToken: JsonTokenLocation, stopToken: JsonTokenLocation)

object JsonNodeLocation {
  def apply(startToken: Token, stopToken: Token): JsonNodeLocation =
    JsonNodeLocation(startToken = JsonTokenLocation(startToken), stopToken = JsonTokenLocation(stopToken))
}
