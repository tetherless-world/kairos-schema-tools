package validators.ksfValidationApi

import com.google.inject.ImplementedBy
import models.sdfDocument.SdfDocument
import validators.SdfDocumentValidator

import scala.concurrent.Future

@ImplementedBy(classOf[RestKsfValidationApi])
trait KsfValidationApi extends SdfDocumentValidator {
  def getAnnotationReadableForm(sdfDocument: SdfDocument): Future[String]
}
