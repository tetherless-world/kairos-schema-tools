package validators.ksfValidationApi

import formats.sdf.SdfDocument
import io.circe.Decoder
import io.circe.generic.semiauto.deriveDecoder
import io.circe.parser.parse
import javax.inject.{Inject, Singleton}
import models.schema.SdfDocumentPath
import models.validation.{ValidationMessage, ValidationMessageType}
import org.slf4j.LoggerFactory
import play.api.libs.ws.WSClient

import scala.concurrent.{ExecutionContext, Future}

final case class KsfValidationApiResults(errorsList: List[String], warningsList: List[String])

@Singleton
class RestKsfValidationApi @Inject()(ws: WSClient)(implicit ec: ExecutionContext) extends KsfValidationApi {
  private val Url = "http://validation.kairos.nextcentury.com/json-ld/ksf/validate"
  private val Accept = "application/json"
  private val ContentType = "application/ld+json"
  implicit val resultsDecoder: Decoder[KsfValidationApiResults] = deriveDecoder
  private val logger = LoggerFactory.getLogger(getClass)

  override def validateSdfDocument(sdfDocument: SdfDocument): Future[List[ValidationMessage]] =
      ws.url(Url)
      .addHttpHeaders("Accept" -> Accept, "Content-Type" -> ContentType)
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
                results.errorsList.map(message => ValidationMessage(message = message, path = SdfDocumentPath(sdfDocumentId = sdfDocument.id), `type` = ValidationMessageType.Error)) ++
                results.warningsList.map(message => ValidationMessage(message = message, path = SdfDocumentPath(sdfDocumentId = sdfDocument.id), `type` = ValidationMessageType.Warning))
              )
            }
          }
        })
}
