package validators.ksfValidationApi

import models.sdfDocument.SdfDocument
import models.validation.ValidationMessage

import scala.concurrent.Future

final class DummyKsfValidationApi extends KsfValidationApi {
  final override def getAnnotationReadableForm(sdfDocument: SdfDocument): Future[String] =
    Future.successful("")

  final override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] =
    Future.successful(List())
}
