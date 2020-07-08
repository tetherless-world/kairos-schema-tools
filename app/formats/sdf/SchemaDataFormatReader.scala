package formats.sdf

import java.io.Reader

import formats.sdf.vocabulary.KAIROS
import models.schema.Schema
import org.apache.jena.rdf.model.{Model, ModelFactory, Resource}
import org.apache.jena.riot.Lang
import formats.sdf.versions.ZeroDot8aSchemaDataFormatDocument

final class SchemaDataFormatReader(reader: Reader) extends AutoCloseable {
  override def close(): Unit =
    reader.close()

  def read(): List[Schema] = {
    val model = ModelFactory.createDefaultModel()
    model.read(reader, null, Lang.JSONLD.getName)

    model.write(System.out, Lang.TTL.getName)
    model.write(System.out, Lang.NT.getName)

    val documentHeader = new SchemaDataFormatDocumentHeader(model)

    val document: SchemaDataFormatDocument =
      documentHeader.sdfVersion match {
        case "0.8a" => new ZeroDot8aSchemaDataFormatDocument(documentHeader.rootResource)
        case sdfVersion => throw new MalformedSchemaDataFormatDocumentException(s"unrecognized SDF version ${sdfVersion}")
      }

    document.schemas
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
