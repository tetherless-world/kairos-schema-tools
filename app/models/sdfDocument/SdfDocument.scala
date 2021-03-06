package models.sdfDocument

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocumentReader
import models.schema.{Primitive, Schema}
import models.validation.ValidationMessage
import validators.Validators

import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source

final case class SdfDocument(
                              ceId: Option[String],
                              id: Uri,
                              namespacePrefixes: List[NamespacePrefix],
                              primitives: List[Primitive],
                              schemas: List[Schema],
                              sdfVersion: String,
                              sourceJson: String,
                              task2: Option[Boolean],
                              validationMessages: List[ValidationMessage]
                            ) {
  def label =
    if (!schemas.isEmpty) {
      schemas(0).label
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
