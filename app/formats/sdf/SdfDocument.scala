package formats.sdf

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import models.graphql.GraphQlSchemaDefinition.JsonArgument
import models.schema.Schema
import models.validation.ValidationMessage
import org.apache.jena.rdf.model.Resource
import validators.Validators

import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source

case class SdfDocument(id: Uri, schemas: List[Schema], sdfVersion: String, sourceJson: String, validationMessages: List[ValidationMessage]) {
  def label: String =
    if (!schemas.isEmpty) {
      schemas(0).name
    } else {
      id.toString
    }
}

object SdfDocument {
  def read(source: Source, sourceUri: Uri): SdfDocument =
    SdfDocumentReader.read(source, sourceUri)

  def read(sourceJson: String, sourceUri: Uri): SdfDocument =
    SdfDocumentReader.read(sourceJson, sourceUri)

  def readAndValidate(sourceJson: String, sourceUri: Uri, validators: Validators)(implicit ec: ExecutionContext): Future[SdfDocument] = {
    readAndValidate(Source.fromString(sourceJson), sourceUri, validators)
  }

  def readAndValidate(source: Source, sourceUri: Uri, validators: Validators)(implicit ec: ExecutionContext): Future[SdfDocument] = {
    val sdfDocument = read(source, sourceUri)
    if (sdfDocument.validationMessages.nonEmpty) {
      // Validation messages on read are typically fatal, don't try to do external validation in that case.
      Future.successful(sdfDocument)
    } else {
      validators.validateSdfDocument(sdfDocument).map(validationMessages => sdfDocument.copy(validationMessages = sdfDocument.validationMessages ++ validationMessages))
    }
  }
}
