package controllers.rest

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import javax.inject.{Inject, Singleton}
import models.json.JsonNodeLocation
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityRelation, EntityRelationRelation, EntityType, OverlapsStepOrder, Schema, SchemaPath, Slot, Step, StepOrder, StepOrderFlag, StepParticipant}
import models.validation.{ValidationMessage, ValidationMessageType}
import play.api.http.MimeTypes
import play.api.libs.json
import play.api.libs.json._
import play.api.mvc.InjectedController
import stores.Store
import play.api.mvc._
//import play.api.libs.functional.syntax._

@Singleton
class RestController @Inject() (store: Store) extends InjectedController {
  private val MimeTypeJsonLd = "application/ld+json"
//  private val AcceptsJsonLd = Accepting(MimeTypeJsonLd)
  private implicit val jsonNodeLocationWrites = Json.writes[JsonNodeLocation]
  private implicit val uriJsonWrites: json.Writes[Uri] = (uri) => JsString(uri.toString)
  private implicit val durationJsonWrites = Json.writes[Duration]
  private implicit val entityRelationRelationJsonWrites = Json.writes[EntityRelationRelation]
  private implicit val entityRelationJsonWrites = Json.writes[EntityRelation]
  private implicit val entityTypeJsonWrites: json.Writes[EntityType] = (entityType) => JsString(entityType.value)
  private implicit val slotJsonWrites = Json.writes[Slot]
  private implicit val stepParticipantJsonWrites = Json.writes[StepParticipant]
  private implicit val stepJsonWrites = Json.writes[Step]
  private implicit val stepOrderFlagJsonWrites: json.Writes[StepOrderFlag] = (flag) => JsString(flag.value)
  private implicit val beforeAfterStepOrderJsonWrites = Json.writes[BeforeAfterStepOrder]
  private implicit val containerContainedStepOrderJsonWrites = Json.writes[ContainerContainedStepOrder]
  private implicit val overlapsStepOrderJsonWrites = Json.writes[OverlapsStepOrder]
  private implicit val stepOrderJsonWrites = Json.writes[StepOrder] // json.Writes[StepOrder]
  private implicit val schemaJsonWrites = Json.writes[Schema]
  private implicit val schemaPathJsonWrites = Json.writes[SchemaPath]
  private implicit val validationMessageTypeJsonWrites: json.Writes[ValidationMessageType] = (`type`) => JsString(`type`.value)
  private implicit val validationMessageJsonWrites = Json.writes[ValidationMessage]
  private implicit val sdfDocumentJsonWrites = Json.writes[SdfDocument]

  def schema(id: String) = Action { implicit request =>
    val schema = store.getSchemaById(Uri.parse(id))
    if (schema.isDefined) {
      render {
        case Accepts.Json => Ok(Json.toJson(schema.get))
        case _ => UnsupportedMediaType("Unsupported media type")
      }
    } else {
      NotFound("Not Found")
    }
  }

  def sdfDocument(id: String) = Action { implicit request =>
    val sdfDocument = store.getSdfDocumentById(Uri.parse(id))
    if (sdfDocument.isDefined) {
      render {
        case Accepts.Json() => Ok(Json.toJson(sdfDocument.get))
//        case AcceptsJsonLd => Ok(sdfDocument.get.sourceJson)
//        case _ => UnsupportedMediaType("Unsupported media type")
        case _ => Ok(sdfDocument.get.sourceJson).as(MimeTypeJsonLd)
      }
    } else {
      NotFound("Not Found")
    }
  }

  def sdfDocuments = Action { implicit request =>
    val sdfDocuments = store.getSdfDocuments
    render {
      case Accepts.Json() => Ok(Json.toJson(sdfDocuments))
      //        case AcceptsJsonLd => Ok(sdfDocument.get.sourceJson)
      //        case _ => UnsupportedMediaType("Unsupported media type")
      case _ => Ok(s"""[${sdfDocuments.map(_.sourceJson).mkString(", ")}]""").as(MimeTypeJsonLd)
    }
  }

}
