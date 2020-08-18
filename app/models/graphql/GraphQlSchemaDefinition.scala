package models.graphql

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.json.JsonNodeLocation
import models.schema._
import models.search.{SearchDocument, SearchDocumentType, SearchResults}
import models.validation.{ValidationMessage, ValidationMessageType}
import sangria.macros.derive._
import sangria.schema.{Argument, Field, InterfaceType, ListType, ObjectType, OptionInputType, OptionType, Schema, StringType, fields}

import scala.util.{Success, Try}

object GraphQlSchemaDefinition extends BaseGraphQlSchemaDefinition {
  // Helper methods
  private def newUuidUri: Uri =
    Uri.parse("urn:uuid:" + UUID.randomUUID().toString)

  // Scalar arguments
  val IdArgument = Argument("id", UriType)
  val JsonArgument = Argument("json", StringType)
  val QueryArgument = Argument("query", StringType)

  // Enum types
  implicit val EntityTypeEnumType = deriveEnumType[EntityType]()
  implicit val SearchDocumentTypeEnumType = deriveEnumType[SearchDocumentType]()
  implicit val StepOrderFlagEnumType = deriveEnumType[StepOrderFlag]()
  implicit val ValidationMessageTypeEnumType = deriveEnumType[ValidationMessageType]()

  // Interface types
  val StepOrderInterfaceType: InterfaceType[GraphQlSchemaContext, StepOrder] =
    InterfaceType(
      "StepOrder",
      fields[GraphQlSchemaContext, StepOrder](
        Field("comments", OptionType(ListType(StringType)), resolve = _.value.comments),
        Field("flags", OptionType(ListType(StepOrderFlagEnumType)), resolve = _.value.flags),
      )
    )

  // Object types
  implicit val JsonNodeLocationObjectType = deriveObjectType[GraphQlSchemaContext, JsonNodeLocation]()
  implicit val DurationObjectType = deriveObjectType[GraphQlSchemaContext, Duration]()
  implicit val EntityRelationRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelationRelation]()
  implicit val EntityRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelation]()
  implicit val SchemaSlotObjectType = deriveObjectType[GraphQlSchemaContext, SchemaSlot](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val BeforeAfterStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, BeforeAfterStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val ContainerContainedStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, ContainerContainedStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val OverlapsStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, OverlapsStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val PrimitiveSlotObjectType = deriveObjectType[GraphQlSchemaContext, PrimitiveSlot]()
  implicit val PrimitiveObjectType = deriveObjectType[GraphQlSchemaContext, Primitive]()
  implicit val StepParticipantObjectType = deriveObjectType[GraphQlSchemaContext, StepParticipant](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val StepObjectType = deriveObjectType[GraphQlSchemaContext, Step](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val SchemaObjectType = deriveObjectType[GraphQlSchemaContext, models.schema.Schema](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    ),
    ReplaceField("order", Field("order", ListType(StepOrderInterfaceType), resolve = _.value.order))
  )
  implicit val SdfDocumentPathSchemaSlotObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathSchemaSlot]()
  implicit val SdfDocumentPathStepParticipantObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathStepParticipant]()
  implicit val SdfDocumentPathStepObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathStep]()
  implicit val SdfDocumentPathSchemaObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathSchema]()
  implicit val SdfDocumentPathPrimitiveSlotObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathPrimitiveSlot]()
  implicit val SdfDocumentPathPrimitiveObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPathPrimitive]()
  implicit val SdfDocumentPathObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocumentPath](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.id).map(_.label))
    )
  )
//  implicit lazy val SdfDocumentPathSchemaSlotObjectType: ObjectType[GraphQlSchemaContext, SdfDocumentPathSchema] = ObjectType("SdfDocumentPathSchema", () => fields[GraphQlSchemaContext, SdfDocumentPathSchema](
//    Field("id", UriType, resolve = _.value.id),
//    Field("resolve", OptionType(SchemaObjectType), resolve = ctx => ctx.ctx.store.getSchemaById(ctx.value.id))
//  ))
//  implicit lazy val SdfDocumentPathSchemaObjectType: ObjectType[GraphQlSchemaContext, SdfDocumentPathSchema] = ObjectType("SdfDocumentPathSchema", () => fields[GraphQlSchemaContext, SdfDocumentPathSchema](
//    Field("id", UriType, resolve = _.value.id),
//    Field("resolve", OptionType(SchemaObjectType), resolve = ctx => ctx.ctx.store.getSchemaById(ctx.value.id))
//  ))
//  implicit lazy val SdfDocumentPathObjectType: ObjectType[GraphQlSchemaContext, SdfDocumentPath] = ObjectType("SdfDocumentPath", () => fields[GraphQlSchemaContext, SdfDocumentPath](
//    Field("schemaId", OptionType(UriType), resolve = _.value.schemaId),
//    Field("schemaSlot", OptionType(SchemaSlotObjectType), resolve = ctx => {
//      if (ctx.value.schemaSlotId.isDefined) {
//        ctx.value.schemaId.flatMap(ctx.ctx.store.getSchemaById(_)).flatMap(_.slots.find(_.id == ctx.value.schemaSlotId.get))
//      } else {
//        None
//      }
//    }),
//    Field("schemaSlotId", OptionType(UriType), resolve = _.value.schemaSlotId),
//    Field("step", OptionType(StepObjectType), resolve = ctx => {
//      if (ctx.value.stepId.isDefined) {
//        ctx.value.schemaId.flatMap(ctx.ctx.store.getSchemaById(_)).flatMap(_.steps.find(_.id == ctx.value.stepId.get))
//      } else {
//        None
//      }
//    }),
//    Field("stepId", OptionType(UriType), resolve = _.value.stepId),
//    Field("sdfDocument", OptionType(SdfDocumentObjectType), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.sdfDocumentId)),
//    Field("sdfDocumentId", UriType, resolve = _.value.sdfDocumentId),
//    Field("stepParticipantId", OptionType(UriType), resolve = _.value.stepParticipantId)
//  )
//  )
  implicit lazy val ValidationMessageObjectType: ObjectType[GraphQlSchemaContext, ValidationMessage] = ObjectType("ValidationMessage", () => fields[GraphQlSchemaContext, ValidationMessage](
    Field("message", StringType, resolve = _.value.message),
    Field("path", SdfDocumentPathObjectType, resolve = _.value.path),
    Field("type", ValidationMessageTypeEnumType, resolve = _.value.`type`)
  )
  )
  implicit lazy val SdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocument](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
      Field("validationMessageTypes", ListType(ValidationMessageTypeEnumType), resolve = _.value.validationMessages.map(_.`type`).distinct)
    )
  )
  implicit val SearchDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SearchDocument]()
  implicit val SearchResultsObjectType = deriveObjectType[GraphQlSchemaContext, SearchResults]()

  // Root query
  val RootQueryType = ObjectType("RootQuery", fields[GraphQlSchemaContext, Unit](
    Field("schemas", ListType(SchemaObjectType), resolve = _.ctx.store.getSchemas),
    Field("schemaById", OptionType(SchemaObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSchemaById(ctx.args.arg(IdArgument))),
    Field("sdfDocumentById", OptionType(SdfDocumentObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.args.arg(IdArgument))),
    Field("sdfDocuments", ListType(SdfDocumentObjectType), resolve = _.ctx.store.getSdfDocuments),
    Field("search", SearchResultsObjectType, arguments = LimitArgument :: OffsetArgument :: QueryArgument :: Nil, resolve = ctx => ctx.ctx.store.search(limit = ctx.args.arg(LimitArgument), offset = ctx.args.arg(OffsetArgument), query = ctx.args.arg(QueryArgument))),
    Field("validateSdfDocument", ListType(ValidationMessageObjectType), arguments = JsonArgument :: Nil, resolve = ctx => {
      implicit val ec = ctx.ctx.executionContext
      SdfDocument.readAndValidate(
        sourceJson = ctx.args.arg(JsonArgument),
        sourceUri = newUuidUri,
        validators = ctx.ctx.validators
      ).map(_.validationMessages)
    }
    )
  ))

  // Root mutation
  val RootMutationType = ObjectType("RootMutation", fields[GraphQlSchemaContext, Unit](
    Field("putSdfDocument", SdfDocumentObjectType, arguments = JsonArgument :: Nil, resolve = ctx => {
      implicit val ec = ctx.ctx.executionContext
      SdfDocument.readAndValidate(
        sourceJson = ctx.args.arg(JsonArgument),
        sourceUri = newUuidUri,
        validators = ctx.ctx.validators
      ).andThen {
        case Success(sdfDocument) => {
          if (!sdfDocument.validationMessages.exists(_.`type` == ValidationMessageType.Fatal)) {
            ctx.ctx.store.putSdfDocument(sdfDocument)
          }
        }
      }
    }
    ))
  )

  // Schema
  val schema = Schema(
    RootQueryType,
    Some(RootMutationType),
    additionalTypes = BeforeAfterStepOrderObjectType :: ContainerContainedStepOrderObjectType :: OverlapsStepOrderObjectType :: Nil
  )
}
