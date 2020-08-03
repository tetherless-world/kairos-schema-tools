package models.graphql

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.schema._
import models.search.{SearchDocument, SearchDocumentType, SearchResults}
import models.validation.{ValidationException, ValidationMessage, ValidationMessageType}
import sangria.macros.derive._
import sangria.schema.{Argument, Field, InterfaceType, ListType, ObjectType, OptionType, Schema, StringType, fields}

import scala.concurrent.Future

object GraphQlSchemaDefinition extends BaseGraphQlSchemaDefinition {
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
  implicit val DurationObjectType = deriveObjectType[GraphQlSchemaContext, Duration]()
  implicit val EntityRelationRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelationRelation]()
  implicit val EntityRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelation]()
  implicit val SlotObjectType = deriveObjectType[GraphQlSchemaContext, Slot]()
  implicit val BeforeAfterStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, BeforeAfterStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val ContainerContainedStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, ContainerContainedStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val OverlapsStepOrderObjectType = deriveObjectType[GraphQlSchemaContext, OverlapsStepOrder](
    Interfaces(StepOrderInterfaceType)
  )
  implicit val StepParticipantObjectType = deriveObjectType[GraphQlSchemaContext, StepParticipant]()
  implicit val StepObjectType = deriveObjectType[GraphQlSchemaContext, Step]()
  implicit val SchemaObjectType = deriveObjectType[GraphQlSchemaContext, models.schema.Schema](
    ReplaceField("order", Field("order", ListType(StepOrderInterfaceType), resolve = _.value.order))
  )
  implicit val SchemaPathObjectType = deriveObjectType[GraphQlSchemaContext, SchemaPath](
//    AddFields(
//      Field("schema", OptionType(SchemaObjectType), resolve = ctx => ctx.value.schemaId.flatMap(ctx.ctx.store.getSchemaById(_))),
//      Field("slot", OptionType(SlotObjectType), resolve = ctx => {
//        if (ctx.value.slotId.isDefined) {
//          ctx.value.schemaId.flatMap(ctx.ctx.store.getSchemaById(_)).flatMap(_.slots.find(_.id == ctx.value.slotId.get))
//        } else {
//          None
//        }
//      }),
//      Field("step", OptionType(StepObjectType), resolve = ctx => {
//        if (ctx.value.stepId.isDefined) {
//          ctx.value.schemaId.flatMap(ctx.ctx.store.getSchemaById(_)).flatMap(_.steps.find(_.id == ctx.value.stepId.get))
//        } else {
//          None
//        }
//      }),
//      Field("sdfDocument", OptionType(SdfDocumentObjectType), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.sdfDocumentId)),
//    )
  )
  implicit val ValidationMessageObjectType = deriveObjectType[GraphQlSchemaContext, ValidationMessage]()
  implicit val SdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocument](
    AddFields(
      Field("name", StringType, resolve = _.value.name)
    )
  )
  implicit val SearchDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SearchDocument]()
  implicit val SearchResultsObjectType = deriveObjectType[GraphQlSchemaContext, SearchResults]()

  // Root query
  val RootQueryType = ObjectType("RootQuery",  fields[GraphQlSchemaContext, Unit](
    Field("schemas", ListType(SchemaObjectType), resolve = _.ctx.store.getSchemas),
    Field("schemaById", OptionType(SchemaObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSchemaById(ctx.args.arg(IdArgument))),
    Field("sdfDocumentById", OptionType(SdfDocumentObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.args.arg(IdArgument))),
    Field("sdfDocuments", ListType(SdfDocumentObjectType), resolve = _.ctx.store.getSdfDocuments),
    Field("search", SearchResultsObjectType, arguments = LimitArgument :: OffsetArgument :: QueryArgument :: Nil, resolve = ctx => ctx.ctx.store.search(limit = ctx.args.arg(LimitArgument), offset = ctx.args.arg(OffsetArgument), query = ctx.args.arg(QueryArgument))),
    Field("validateSdfDocument", ListType(ValidationMessageObjectType), arguments = JsonArgument :: Nil, resolve = ctx => {
        val sdfDocumentJson = ctx.args.arg(JsonArgument)
        val sdfDocument = SdfDocumentReader.read(sdfDocumentJson, Uri.parse("urn:uuid:" + UUID.randomUUID().toString))
        if (sdfDocument.validationMessages.nonEmpty) {
          sdfDocument.validationMessages
        } else {
          ctx.ctx.validators.validateSdfDocument(sdfDocument)
        }
    })
  ))

  // Schema
  val schema = Schema(
    RootQueryType,
    additionalTypes = BeforeAfterStepOrderObjectType :: ContainerContainedStepOrderObjectType :: OverlapsStepOrderObjectType :: Nil
  )
}
