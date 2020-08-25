package validators

import formats.sdf.{SdfDocument, SdfDocumentReader}
import javax.inject.{Inject, Singleton}
import models.schema.DefinitionPath
import models.validation.{ValidationMessage, ValidationMessageType}
import validators.ksfValidationApi.KsfValidationApi

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class Validators(val sdfDocumentValidators: List[SdfDocumentValidator])(implicit ec: ExecutionContext) extends SdfDocumentValidator {
  @Inject
  def this(ksfValidationApi: KsfValidationApi)(implicit ec: ExecutionContext) =
    this(List(ksfValidationApi))

  final override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] = {
    Future.sequence(sdfDocumentValidators.map(_.validateSdfDocument(sdfDocument))).map(_.flatten)
  }
}

