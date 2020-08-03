package formats.sdf

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.vocabulary.KAIROS
import models.schema.SchemaPath
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import org.apache.jena.rdf.model.{Model, Resource}

final class SdfDocumentHeader(model: Model, sourceId: Uri) {
  private def readRootResource: Resource = {
    val versionStatements = model.listStatements(null, KAIROS.sdfVersion, null)
    if (!versionStatements.hasNext) {
      throw ValidationException(message = "missing sdfVersion statement", path = SchemaPath(sdfDocumentId = sourceId), `type` = ValidationMessageType.Fatal)
    }
    val versionStatement = versionStatements.next()
    val rootResource = versionStatement.getSubject
    if (rootResource.getURI == null) {
      throw ValidationException(message = "document root missing id", path = SchemaPath(sdfDocumentId = sourceId), `type` = ValidationMessageType.Fatal)
    }
    rootResource
  }
  val rootResource = readRootResource
  val id = Uri.parse(rootResource.getURI)

  private def readSdfVersion(id: Uri, rootResource: Resource): String = {
    val versionStatements = rootResource.listProperties(KAIROS.sdfVersion)
    if (!versionStatements.hasNext) {
      throw ValidationException(message = "missing sdfVersion statement", path = SchemaPath(sdfDocumentId = id), `type` = ValidationMessageType.Fatal)
    }
    val versionStatement = versionStatements.next()
    if (versionStatements.hasNext) {
      throw ValidationException(message = "multiple sdfVersion statements", path = SchemaPath(sdfDocumentId = id), `type` = ValidationMessageType.Fatal)
    }
    if (!versionStatement.getObject.isLiteral) {
      throw ValidationException(message = "sdfVersion statement has a non-Literal object", path = SchemaPath(sdfDocumentId = id), `type` = ValidationMessageType.Fatal)
    }
    versionStatement.getObject.asLiteral().getString
  }
  val sdfVersion = readSdfVersion(id, rootResource)
}
