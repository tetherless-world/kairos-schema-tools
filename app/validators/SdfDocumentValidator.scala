package validators

import formats.sdf.SdfDocument
import models.validation.ValidationMessage

import scala.concurrent.Future

trait SdfDocumentValidator {
  def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]]
}
