package models.json

import org.antlr.v4.runtime.Token

final case class JsonTokenLocation(column: Int, line: Int, startIndex: Int, stopIndex: Int)

object JsonTokenLocation {
  def apply(token: Token): JsonTokenLocation =
    JsonTokenLocation(column = token.getCharPositionInLine, line = token.getLine, startIndex = token.getStartIndex, stopIndex = token.getStopIndex)
}
