package services.validation

import com.google.inject.ImplementedBy
import models.validation.KsfValidationResults

import scala.concurrent.Future

@ImplementedBy(classOf[RestKsfValidationApiService])
trait KsfValidationApiService {
  def validate(sdfDocumentSourceJson: String): Future[KsfValidationResults]
}
