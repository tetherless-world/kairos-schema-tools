package services.validation

import models.validation.KsfValidationResults

import scala.concurrent.Future

final class DummyKsfValidationApiService extends KsfValidationApiService {
  override def validate(sdfDocumentSourceJson: String): Future[KsfValidationResults] =
    Future.successful(KsfValidationResults(errorsList = List(), warningsList = List()))
}
