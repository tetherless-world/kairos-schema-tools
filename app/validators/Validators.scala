package validators

import formats.sdf.{MalformedSchemaDataFormatDocumentException, SdfDocument, SdfDocumentReader}
import javax.inject.{Inject, Singleton}
import models.schema.SchemaPath
import models.validation.{ValidationMessage, ValidationMessageType}
import validators.ksfValidationApi.KsfValidationApi

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class Validators @Inject()(ksfValidationApi: KsfValidationApi)(implicit ec: ExecutionContext) extends SdfDocumentValidator {
  val sdfDocumentValidators: List[SdfDocumentValidator] = List(ksfValidationApi)

  final override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] = {
    Future.sequence(sdfDocumentValidators.map(_.validateSdfDocument(sdfDocument))).map(_.flatten)
  }
}

