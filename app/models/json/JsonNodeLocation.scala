package models.json

import org.antlr.v4.runtime.Token

final case class JsonNodeLocation(column: Int, line: Int)

object JsonNodeLocation {
  def apply(startToken: Token, stopToken: Token): JsonNodeLocation =
    JsonNodeLocation(column = startToken.getCharPositionInLine, line = startToken.getLine)
}
