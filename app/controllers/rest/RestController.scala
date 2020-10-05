package controllers.rest

import edu.rpi.tw.twks.uri.Uri
import javax.inject.{Inject, Singleton}
import models.json.{JsonNodeLocation, JsonTokenLocation}
import models.schema._
import models.sdfDocument.{NamespacePrefix, SdfDocument}
import models.validation.{ValidationMessage, ValidationMessageType}
import play.api.libs.json
import play.api.libs.json._
import play.api.mvc.InjectedController
import stores.Store
//import play.api.libs.functional.syntax._

@Singleton
class RestController @Inject() (store: Store) extends InjectedController {
  private val MimeTypeJsonLd = "application/ld+json"
//  private val AcceptsJsonLd = Accepting(MimeTypeJsonLd)
  // Duration
  private implicit val durationJsonWrites = Json.writes[Duration]
  // JSON
  private implicit val jsonTokenLocationWrites = Json.writes[JsonTokenLocation]
  private implicit val jsonNodeLocationWrites = Json.writes[JsonNodeLocation]
  // URI
  private implicit val uriJsonWrites: json.Writes[Uri] = (uri) => JsString(uri.toString)
  // DefinitionPath
  private implicit val definitionPathPrimitiveSlotJsonWrites = Json.writes[DefinitionPath.DefinitionPathPrimitiveSlot]
  private implicit val definitionPathPrimitiveJsonWrites = Json.writes[DefinitionPath.DefinitionPathPrimitive]
  private implicit val definitionPathSchemaSlotJsonWrites = Json.writes[DefinitionPath.DefinitionPathSchemaSlot]
  private implicit val definitionPathStepParticipantJsonWrites = Json.writes[DefinitionPath.DefinitionPathStepParticipant]
  private implicit val definitionPathStepJsonWrites = Json.writes[DefinitionPath.DefinitionPathStep]
  private implicit val definitionPathSchemaJsonWrites = Json.writes[DefinitionPath.DefinitionPathSchema]
  private implicit val definitionPathPathSdfDocumentJsonWrites = Json.writes[DefinitionPath.DefinitionPathSdfDocument]
  private implicit val definitionPathJsonWrites = Json.writes[DefinitionPath]
  // Entity types
  private implicit val entityTypeJsonWrites: json.Writes[EntityType] = (entityType) => JsString(entityType.value)
  private implicit val entityTypesJsonWrites = Json.writes[EntityTypes]
  // Entity relations
  private implicit val entityRelationRelationJsonWrites = Json.writes[EntityRelationRelation]
  private implicit val entityRelationJsonWrites = Json.writes[EntityRelation]
  // Primitive
  private implicit val primitiveSlotJsonWrites: json.Writes[PrimitiveSlot] = Json.writes[PrimitiveSlot]
  private implicit val primitiveJsonWrites: json.Writes[Primitive] = Json.writes[Primitive]
  // Schema
  private implicit val schemaSlotJsonWrites = Json.writes[SchemaSlot]
  private implicit val stepParticipantValueJsonWrites = Json.writes[StepParticipantValue]
  private implicit val stepParticipantJsonWrites = Json.writes[StepParticipant]
  private implicit val stepJsonWrites = Json.writes[Step]
  private implicit val stepsJsonWrites = Json.writes[Steps]
  private implicit val stepOrderFlagJsonWrites: json.Writes[StepOrderFlag] = (flag) => JsString(flag.value)
  private implicit val beforeAfterStepOrderJsonWrites = Json.writes[BeforeAfterStepOrder]
  private implicit val containerContainedStepOrderJsonWrites = Json.writes[ContainerContainedStepOrder]
  private implicit val overlapsStepOrderJsonWrites = Json.writes[OverlapsStepOrder]
  private implicit val stepOrderJsonWrites = Json.writes[StepOrder] // json.Writes[StepOrder]
  private implicit val schemaJsonWrites = Json.writes[Schema]
  // Validation message
  private implicit val validationMessageTypeJsonWrites: json.Writes[ValidationMessageType] = (`type`) => JsString(`type`.value)
  private implicit val validationMessageJsonWrites = Json.writes[ValidationMessage]
  // SDF document
  private implicit val sdfDocumentNamespacePrefixJsonWrites = Json.writes[NamespacePrefix]
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
