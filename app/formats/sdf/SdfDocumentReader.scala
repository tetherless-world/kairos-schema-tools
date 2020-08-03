package formats.sdf

import java.io.{Reader, StringReader}

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.versions.ZeroDot8cSdfDocumentReader
import formats.sdf.vocabulary.KAIROS
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.SchemaPath
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.{Lang, RiotException}

import scala.io.Source

/**
 * Schema Data Format (SDF) document reader
 *
 * @param source source to read Schema Data Format JSON documents
 */
final class SdfDocumentReader(source: Source) extends AutoCloseable {
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
          id = SdfDocumentHeader.DummyId,
          schemas = List(),
          sdfVersion = "",
          sourceJson = sourceJson,
          validationMessages = List(
            ValidationMessage(
              message = e.getMessage,
              path = SdfDocumentHeader.DummyPath,
              `type` = ValidationMessageType.Fatal
            )
          )
        )

      }
    }

//    model.write(System.out, Lang.TTL.getName)

    var header: SdfDocumentHeader = null
    try {
      header = new SdfDocumentHeader(model)
    } catch {
      case e: ValidationException => {
        return SdfDocument(
            id = e.messages.map(_.path.sdfDocumentId).head,
            schemas = List(),
            sdfVersion = "",
            sourceJson = sourceJson,
            validationMessages = e.messages
        )
      }
    }

    try {
      header.sdfVersion match {
        case ZeroDot8cSdfDocumentReader.SdfVersion => new ZeroDot8cSdfDocumentReader(header, sourceJson).read()
        case sdfVersion =>
          throw ValidationException(
            message = s"unrecognized SDF version ${sdfVersion}",
            path = SchemaPath(sdfDocumentId = header.id),
            `type` = ValidationMessageType.Fatal
          )
      }
    } catch {
      case e: ValidationException =>
        SdfDocument(
          id = header.id,
          schemas = List(),
          sdfVersion = header.sdfVersion,
          sourceJson = sourceJson,
          validationMessages = e.messages
        )
    }
  }
}

object SdfDocumentReader extends WithResource {
  def read(documentJson: String): SdfDocument =
    withResource(new SdfDocumentReader(Source.fromString(documentJson))) { reader =>
      reader.read()
    }
}
