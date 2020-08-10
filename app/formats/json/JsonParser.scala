package formats.json

import formats.json.antlr.{JSONBaseVisitor, JSONLexer, JSONParser}
import models.json.{ArrayJsonNode, BooleanValueJsonNode, JsonNode, JsonNodeLocation, NullJsonNode, NumberValueJsonNode, ObjectJsonNode, StringValueJsonNode}
import org.antlr.v4.runtime.tree.TerminalNode
import org.antlr.v4.runtime.{CharStreams, CommonTokenStream}

import scala.collection.mutable


object JsonParser {
  def parse(json: String): JsonNode = {
    val charStream = CharStreams.fromString(json)
    val lexer = new JSONLexer(charStream)
    val tokenStream = new CommonTokenStream(lexer)
    val parser = new JSONParser(tokenStream)
    val parseTree = parser.json()
    new JSONBaseVisitor[JsonNode] {
      override def visitArr(ctx: JSONParser.ArrContext): ArrayJsonNode = {
        var list = new mutable.ListBuffer[JsonNode]
        ctx.children.forEach(child => {
          if (child.isInstanceOf[JSONParser.ValueContext]) {
            val value = child.asInstanceOf[JSONParser.ValueContext]
            list += super.visit(value)
          }
        })
        ArrayJsonNode(list = list.toList, location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop))
      }

      override def visitObj(ctx: JSONParser.ObjContext): ObjectJsonNode = {
        val map = new mutable.HashMap[String, JsonNode]()
        ctx.children.forEach(child => {
          if (child.isInstanceOf[JSONParser.PairContext]) {
            val pair = child.asInstanceOf[JSONParser.PairContext]
            val key = pair.STRING().getText
            val value = super.visit(pair.value())
            map.update(key, value)
          }
        })
        ObjectJsonNode(map = map.toMap, location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop))
      }

      override def visitValue(ctx: JSONParser.ValueContext): JsonNode = {
        if (ctx.getChildCount != 1) {
          throw new IllegalStateException()
        }
        val child = ctx.getChild(0)
        if (child.isInstanceOf[JSONParser.ArrContext] || child.isInstanceOf[JSONParser.ObjContext]) {
          super.visit(child)
        } else if (child.isInstanceOf[TerminalNode]) {
          val terminalNode = child.asInstanceOf[TerminalNode]
          if (terminalNode.getSymbol.getType == JSONParser.STRING) {
            StringValueJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop), value = terminalNode.getText)
          } else if (terminalNode.getSymbol.getText == JSONParser.NUMBER) {
            NumberValueJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop), value = terminalNode.getText.toDouble)
          } else {
            terminalNode.getSymbol.getText match {
              case "false" => BooleanValueJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop), value = false)
              case "null" => NullJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop))
              case "true" => BooleanValueJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop), value = true)
              case other => throw new UnsupportedOperationException(other)
            }
          }
        } else {
          throw new UnsupportedOperationException
        }
      }
    }.visit(parseTree)
  }
}
