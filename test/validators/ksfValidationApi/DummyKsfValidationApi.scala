package validators.ksfValidationApi

import models.sdfDocument.SdfDocument
import models.validation.ValidationMessage

import scala.concurrent.Future

final class DummyKsfValidationApi extends KsfValidationApi {
  override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] =
    Future.successful(List())
}
