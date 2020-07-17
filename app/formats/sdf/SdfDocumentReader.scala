package formats.sdf

import java.io.{Reader, StringReader}

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.versions.ZeroDot8aSdfDocumentReader
import formats.sdf.vocabulary.KAIROS
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.Lang

import scala.io.Source

/**
 * Schema Data Format (SDF) document reader
 *
 * @param documentId URI for the document. If absent a URI will be generated from the document source.
 * @param documentSource source to read Schema Data Format JSON documents
 */
final class SdfDocumentReader(documentId: Option[Uri], documentSource: Source) extends AutoCloseable {
  override def close(): Unit =
    documentSource.close()

  def read(): SdfDocument = {
    val documentSourceJson = documentSource.mkString

    val documentId =
      this.documentId.getOrElse(
        Uri.parse("sha1:" + java.security.MessageDigest.getInstance("SHA-1").digest(documentSourceJson.getBytes("UTF-8")).map((b: Byte) => (if (b >= 0 & b < 16) "0" else "") + (b & 0xFF).toHexString).mkString)
      )
    // Hash the JSON to get a document id
    // Not expected to be a stable identifier (yet)
    // Would either need to hash a canonical serialization (easier but fragile) or a normalized graph (harder but robust)

    val model = ModelFactory.createDefaultModel()
    model.read(new StringReader(documentSourceJson), documentId.toString, Lang.JSONLD.getName)

    model.write(System.out, Lang.TTL.getName)
//    model.write(System.out, Lang.NT.getName)

    val documentHeader = new SchemaDataFormatDocumentHeader(model)

    documentHeader.sdfVersion match {
      case ZeroDot8aSdfDocumentReader.SdfVersion => new ZeroDot8aSdfDocumentReader(documentId, documentHeader.rootResource, documentSourceJson).read()
      case sdfVersion => throw new MalformedSchemaDataFormatDocumentException(s"unrecognized SDF version ${sdfVersion}")
    }
  }

  private final class SchemaDataFormatDocumentHeader(model: Model) {
    private def readRootResource: Resource = {
      val versionStatements = model.listStatements(null, KAIROS.sdfVersion, null)
      if (!versionStatements.hasNext) {
        throw new MalformedSchemaDataFormatDocumentException("missing sdfVersion statement")
      }
      val versionStatement = versionStatements.next()
      versionStatement.getSubject
    }
    val rootResource = readRootResource

    private def readSdfVersion(rootResource: Resource): String = {
      val versionStatements = rootResource.listProperties(KAIROS.sdfVersion)
      if (!versionStatements.hasNext) {
        throw new MalformedSchemaDataFormatDocumentException("missing sdfVersion statement")
      }
      val versionStatement = versionStatements.next()
      if (versionStatements.hasNext) {
        throw new MalformedSchemaDataFormatDocumentException("multiple sdfVersion statements")
      }
      if (!versionStatement.getObject.isLiteral) {
        throw new MalformedSchemaDataFormatDocumentException("sdfVersion statement has a non-Literal object")
      }
      versionStatement.getObject.asLiteral().getString
    }
    val sdfVersion = readSdfVersion(rootResource)
  }
}

object SdfDocumentReader extends WithResource {
  def read(documentId: Option[Uri], documentJson: String): SdfDocument =
    withResource(new SdfDocumentReader(documentId, Source.fromString(documentJson))) { reader =>
      reader.read()
    }

  def read(documentJson: String): SdfDocument =
    read(documentId = None, documentJson = documentJson)
}
