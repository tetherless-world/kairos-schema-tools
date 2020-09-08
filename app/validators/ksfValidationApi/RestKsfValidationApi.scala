package validators.ksfValidationApi

import io.circe.Decoder
import io.circe.generic.semiauto.deriveDecoder
import io.circe.parser.parse
import javax.inject.{Inject, Singleton}
import models.schema.DefinitionPath
import models.sdfDocument.SdfDocument
import models.validation.{ValidationMessage, ValidationMessageType}
import org.slf4j.LoggerFactory
import play.api.libs.ws.WSClient

import scala.concurrent.{ExecutionContext, Future}

final case class KsfValidationApiResults(errorsList: List[String], warningsList: List[String])

@Singleton
class RestKsfValidationApi @Inject()(ws: WSClient)(implicit ec: ExecutionContext) extends KsfValidationApi {
  private val BaseUrl = "http://validation.kairos.nextcentury.com/json-ld/ksf/"
  private val JsonLdContentType = "application/ld+json"
  implicit val resultsDecoder: Decoder[KsfValidationApiResults] = deriveDecoder
  private val logger = LoggerFactory.getLogger(getClass)

  override def getAnnotationReadableForm(sdfDocument: SdfDocument): Future[String] =
    ws.url(BaseUrl + "annotator-readable-form")
      .addHttpHeaders("Accept" -> "text/plain", "Content-Type" -> JsonLdContentType)
      .post(sdfDocument.sourceJson).flatMap(response =>
        if (response.status == 200) {
          Future.successful(response.body)
        } else {
          Future.failed(new KsfValidationApiException(response.body))
        }
    )

  override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] =
      ws.url(BaseUrl + "validate")
      .addHttpHeaders("Accept" -> "application/json", "Content-Type" -> JsonLdContentType)
      .post(sdfDocument.sourceJson).flatMap(response => {
        val parseResult = parse(response.body)
        parseResult match {
          case Left(parsingFailure) => {
            logger.warn("error KSF validation API results JSON: {}", parsingFailure)
            Future.failed(parsingFailure)
          }
          case Right(json) =>
            resultsDecoder.decodeJson(json) match {
              case Left(decodingFailure) =>
                Future.failed(decodingFailure)
              case Right(results) => Future.successful(
                results.errorsList.map(message => ValidationMessage(message = message, path = DefinitionPath.sdfDocument(sdfDocument.id).build, `type` = ValidationMessageType.Error)) ++
                results.warningsList.map(message => ValidationMessage(message = message, path = DefinitionPath.sdfDocument(sdfDocument.id).build, `type` = ValidationMessageType.Warning))
              )
            }
          }
        })
}
