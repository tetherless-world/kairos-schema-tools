package formats.sdf

import java.io.{Reader, StringReader}

import edu.rpi.tw.twks.uri.Uri
import formats.json.JsonParser
import formats.sdf.versions.ZeroDot8SdfDocumentReader
import formats.sdf.vocabulary.KAIROS
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.SdfDocumentPath
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.{Lang, RiotException}

import scala.io.Source

/**
 * Schema Data Format (SDF) document reader
 *
 * @param source source to read Schema Data Format JSON documents
 * @param sourceUri URI of the source, such as a file: URI; only used if the document can't be parsed
 */
final class SdfDocumentReader(source: Source, sourceUri: Uri) extends AutoCloseable {
  override def close(): Unit =
    source.close()

  def read(): SdfDocument = {
    val sourceJson = source.mkString

    val model = ModelFactory.createDefaultModel()
    try {
      model.read(new StringReader(sourceJson), "", Lang.JSONLD.getName)
    } catch {
      case e: RiotException => {
        return SdfDocument(
          id = sourceUri,
          primitives = List(),
          schemas = List(),
          sdfVersion = "",
          sourceJson = sourceJson,
          validationMessages = List(
            ValidationMessage(
              message = e.getMessage,
              path = SdfDocumentPath.builder(sourceUri).build,
              `type` = ValidationMessageType.Fatal
            )
          )
        )

      }
    }

//    model.write(System.out, Lang.TTL.getName)

    var header: SdfDocumentHeader = null
    try {
      header = new SdfDocumentHeader(model, sourceUri)
    } catch {
      case e: ValidationException => {
        return SdfDocument(
            id = e.messages.map(_.path.id).headOption.getOrElse(sourceUri),
            primitives = List(),
            schemas = List(),
            sdfVersion = "",
            sourceJson = sourceJson,
            validationMessages = e.messages
        )
      }
    }

    val sourceJsonNode = JsonParser.parse(sourceJson)

    try {
      header.sdfVersion match {
        case ZeroDot8SdfDocumentReader.SdfVersion => new ZeroDot8SdfDocumentReader(header, sourceJson, sourceJsonNode).read()
        case sdfVersion =>
          throw ValidationException(
            message = s"unrecognized SDF version ${sdfVersion}",
            path = SdfDocumentPath.builder(header.id).build,
            `type` = ValidationMessageType.Fatal
          )
      }
    } catch {
      case e: ValidationException =>
        SdfDocument(
          id = header.id,
          primitives = List(),
          schemas = List(),
          sdfVersion = header.sdfVersion,
          sourceJson = sourceJson,
          validationMessages = e.messages
        )
    }
  }
}

object SdfDocumentReader extends WithResource {
  def read(sourceJson: String, sourceUri: Uri): SdfDocument =
    read(Source.fromString(sourceJson), sourceUri)

  def read(source: Source, sourceUri: Uri): SdfDocument =
    withResource(new SdfDocumentReader(source, sourceUri)) { reader =>
      reader.read()
    }
}
