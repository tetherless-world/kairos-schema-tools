package services.validation

import io.circe.Decoder
import javax.inject.Inject
import models.validation.KsfValidationResults
import play.api.libs.ws.WSClient
import io.circe.generic.semiauto.deriveDecoder
import io.circe.parser.parse
import org.slf4j.LoggerFactory

import scala.concurrent.{Await, ExecutionContext, Future}

class KsfValidationApiService @Inject() (ws: WSClient)(implicit ec: ExecutionContext) {
  private val Url = "http://validation.kairos.nextcentury.com/json-ld/ksf/validate"
  private val Accept = "application/json"
  private val ContentType = "application/ld+json"
  implicit val resultsDecoder: Decoder[KsfValidationResults] = deriveDecoder
  private val logger = LoggerFactory.getLogger(getClass)

  def validate(sdfDocumentSourceJson: String): Future[KsfValidationResults] = {
    ws.url(Url)
      .addHttpHeaders("Accept" -> Accept, "Content-Type" -> ContentType)
      .post(sdfDocumentSourceJson).flatMap(response => {
      val parseResult = parse(response.body)
      parseResult match {
        case Left(parsingFailure) => {
          logger.warn("error KSF validation API results JSON: {}", parsingFailure)
          Future.failed(parsingFailure)
        }
        case Right(json) => {
          resultsDecoder.decodeJson(json) match {
            case Left(decodingFailure) => {
              Future.failed(decodingFailure)
            }
            case Right(results) => Future.successful(results)
          }
        }
      }
    })
  }
}
