package formats.json

import java.util

import formats.json.antlr.{JSONBaseVisitor, JSONLexer, JSONParser}
import models.json.{ArrayJsonNode, BooleanValueJsonNode, JsonNode, JsonNodeLocation, NullJsonNode, NumberValueJsonNode, ObjectJsonNode, StringValueJsonNode}
import org.antlr.v4.runtime.atn.ATNConfigSet
import org.antlr.v4.runtime.dfa.DFA
import org.antlr.v4.runtime.tree.TerminalNode
import org.antlr.v4.runtime.{ANTLRErrorListener, CharStreams, CommonTokenStream, Parser, RecognitionException, Recognizer}
import org.slf4j.LoggerFactory

import scala.collection.mutable


object JsonParser {
  private val logger = LoggerFactory.getLogger(getClass)

  def parse(json: String): JsonNode = {
    val charStream = CharStreams.fromString(json)
    val lexer = new JSONLexer(charStream)
    val tokenStream = new CommonTokenStream(lexer)
    val parser = new JSONParser(tokenStream)
    parser.addErrorListener(new ANTLRErrorListener {
      override def syntaxError(recognizer: Recognizer[_, _], offendingSymbol: Any, line: Int, charPositionInLine: Int, msg: String, e: RecognitionException): Unit = {
        logger.error("JSON syntax error at line:column {}:{}: {}", line.toString, charPositionInLine.toString, msg)
      }

      override def reportAmbiguity(recognizer: Parser, dfa: DFA, startIndex: Int, stopIndex: Int, exact: Boolean, ambigAlts: util.BitSet, configs: ATNConfigSet): Unit = ???

      override def reportAttemptingFullContext(recognizer: Parser, dfa: DFA, startIndex: Int, stopIndex: Int, conflictingAlts: util.BitSet, configs: ATNConfigSet): Unit = ???

      override def reportContextSensitivity(recognizer: Parser, dfa: DFA, startIndex: Int, stopIndex: Int, prediction: Int, configs: ATNConfigSet): Unit = ???
    })
    val parseTree = parser.obj()
    new JSONBaseVisitor[JsonNode] {
      private def stripStringQuotes(string: String): String =
        string.substring(1, string.length - 1)

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
            val key = stripStringQuotes(pair.STRING().getText)
            val value = super.visit(pair.value())
            map.update(key, value)
          }
        })
        ObjectJsonNode(map = map.toMap, text = ctx.getText(), location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop))
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
            StringValueJsonNode(location = JsonNodeLocation(startToken = ctx.start, stopToken = ctx.stop), value = stripStringQuotes(terminalNode.getText))
          } else if (terminalNode.getSymbol.getType == JSONParser.NUMBER) {
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
