package formats.sdf

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.vocabulary.KAIROS
import models.schema.SchemaPath
import org.apache.jena.rdf.model.{Model, Resource}

final class SdfDocumentHeader(model: Model) {
  private def readRootResource: Resource = {
    val versionStatements = model.listStatements(null, KAIROS.sdfVersion, null)
    if (!versionStatements.hasNext) {
      throw new MalformedSchemaDataFormatDocumentException("missing sdfVersion statement", SchemaPath(sdfDocumentId = Uri.parse("http://example.com")))
    }
    val versionStatement = versionStatements.next()
    val rootResource = versionStatement.getSubject
    if (rootResource.getURI == null) {
      throw new MalformedSchemaDataFormatDocumentException("document root missing id", SchemaPath(sdfDocumentId = Uri.parse("http://example.com")))
    }
    rootResource
  }
  val rootResource = readRootResource
  val id = Uri.parse(rootResource.getURI)

  private def readSdfVersion(id: Uri, rootResource: Resource): String = {
    val versionStatements = rootResource.listProperties(KAIROS.sdfVersion)
    if (!versionStatements.hasNext) {
      throw new MalformedSchemaDataFormatDocumentException("missing sdfVersion statement", SchemaPath(sdfDocumentId = id))
    }
    val versionStatement = versionStatements.next()
    if (versionStatements.hasNext) {
      throw new MalformedSchemaDataFormatDocumentException("multiple sdfVersion statements", SchemaPath(sdfDocumentId = id))
    }
    if (!versionStatement.getObject.isLiteral) {
      throw new MalformedSchemaDataFormatDocumentException("sdfVersion statement has a non-Literal object", SchemaPath(sdfDocumentId = id))
    }
    versionStatement.getObject.asLiteral().getString
  }
  val sdfVersion = readSdfVersion(id, rootResource)
}
