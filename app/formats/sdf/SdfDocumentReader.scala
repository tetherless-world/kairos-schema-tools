package formats.sdf

import java.io.{Reader, StringReader}

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.versions.ZeroDot8cSdfDocumentReader
import formats.sdf.vocabulary.KAIROS
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.SchemaPath
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.Lang

import scala.io.Source

/**
 * Schema Data Format (SDF) document reader
 *
 * @param documentId URI for the document. If absent a URI will be generated from the document source.
 * @param documentSource source to read Schema Data Format JSON documents
 */
final class SdfDocumentReader(documentSource: Source) extends AutoCloseable {
  override def close(): Unit =
    documentSource.close()

  def read(): SdfDocument = {
    val documentSourceJson = documentSource.mkString

    val model = ModelFactory.createDefaultModel()
    model.read(new StringReader(documentSourceJson), "", Lang.JSONLD.getName)

//    model.write(System.out, Lang.TTL.getName)

    val documentHeader = new SdfDocumentHeader(model)

    documentHeader.sdfVersion match {
      case ZeroDot8cSdfDocumentReader.SdfVersion => new ZeroDot8cSdfDocumentReader(documentHeader, documentSourceJson).read()
      case sdfVersion => throw new MalformedSchemaDataFormatDocumentException(s"unrecognized SDF version ${sdfVersion}", SchemaPath(sdfDocumentId = documentHeader.id))
    }
  }
}

object SdfDocumentReader extends WithResource {
  def read(documentJson: String): SdfDocument =
    withResource(new SdfDocumentReader(Source.fromString(documentJson))) { reader =>
      reader.read()
    }
}
