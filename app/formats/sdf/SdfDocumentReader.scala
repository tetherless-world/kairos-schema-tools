package formats.sdf

import java.io.{Reader, StringReader}
import java.nio.charset.MalformedInputException

import edu.rpi.tw.twks.uri.Uri
import formats.json.JsonParser
import formats.sdf.versions.VersionOneSdfDocumentReader
import formats.sdf.vocabulary.KAIROS
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.DefinitionPath
import models.sdfDocument.SdfDocument
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.{Lang, RiotException}

import scala.io.Source

/**
 * Schema Data Format (SDF) document reader
 *
 * @param source    source to read Schema Data Format JSON documents
 * @param sourceUri URI of the source, such as a file: URI; only used if the document can't be parsed
 */
final class SdfDocumentReader(source: Source, sourceUri: Uri) extends AutoCloseable {
  override def close(): Unit =
    source.close()

  def read(): SdfDocument = {
    val sourceJson = try {
      source.mkString
    } catch {
      case e: MalformedInputException =>
        return SdfDocument(
          ceId = None,
          id = sourceUri,
          namespacePrefixes = List(),
          primitives = List(),
          schemas = List(),
          sdfVersion = "",
          sourceJson = "",
          task2 = None,
          validationMessages = List(
            ValidationMessage(
              message = e.getMessage,
              path = DefinitionPath.sdfDocument(sourceUri).build,
              `type` = ValidationMessageType.Fatal
            )
          )
        )
    }

  val baseUri = SdfDocumentReader.BaseUri

  val model = ModelFactory.createDefaultModel()
  try {
    model.read(new StringReader(sourceJson), baseUri.toString, Lang.JSONLD.getName)
  } catch {
    case e: RiotException => {
      return SdfDocument(
        ceId = None,
        id = sourceUri,
        namespacePrefixes = List(),
        primitives = List(),
        schemas = List(),
        sdfVersion = "",
        sourceJson = sourceJson,
        task2 = None,
        validationMessages = List(
          ValidationMessage(
            message = e.getMessage,
            path = DefinitionPath.sdfDocument(sourceUri).build,
            `type` = ValidationMessageType.Fatal
          )
        )
      )

    }
  }

  //    model.write(System.out, Lang.TTL.getName)

  var header: SdfDocumentHeader = null
  try {
    header = new SdfDocumentHeader(baseUri = baseUri, model = model, sourceUri = sourceUri)
  } catch {
    case e: ValidationException => {
      return SdfDocument(
        ceId = None,
        id = e.messages.map(_.path.sdfDocument.id).headOption.getOrElse(sourceUri),
        namespacePrefixes = List(),
        primitives = List(),
        schemas = List(),
        sdfVersion = "",
        sourceJson = sourceJson,
        task2 = None,
        validationMessages = e.messages
      )
    }
  }

  val sourceJsonNode = JsonParser.parse(sourceJson)

  try {
    if (header.sdfVersion.startsWith("0.8") || header.sdfVersion.startsWith("0.9") || header.sdfVersion.startsWith("1.0")) {
      new VersionOneSdfDocumentReader(header, sourceJson, sourceJsonNode).read()
    } else {
      throw ValidationException(
        message = s"unrecognized SDF version ${header.sdfVersion}",
        path = DefinitionPath.sdfDocument(header.id).build,
        `type` = ValidationMessageType.Fatal
      )
    }
  } catch {
    case e: ValidationException =>
      SdfDocument(
        ceId = None,
        id = header.id,
        namespacePrefixes = List(),
        primitives = List(),
        schemas = List(),
        sdfVersion = header.sdfVersion,
        sourceJson = sourceJson,
        task2 = None,
        validationMessages = e.messages
      )
  }
}

}

object SdfDocumentReader extends WithResource {
  private val BaseUri = Uri.parse("http://kairos.tw.rpi.edu/sdfDocument/")

  def read(sourceJson: String, sourceUri: Uri): SdfDocument =
    read(Source.fromString(sourceJson), sourceUri)

  def read(source: Source, sourceUri: Uri): SdfDocument =
    withResource(new SdfDocumentReader(source, sourceUri)) { reader =>
      reader.read()
    }
}
