package models.graphql

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.json.JsonNodeLocation
import models.schema._
import models.sdfDocument.{SdfDocument, NamespacePrefix}
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
  // Models that don't depend on other models
  implicit val JsonNodeLocationObjectType = deriveObjectType[GraphQlSchemaContext, JsonNodeLocation]()
  implicit val DurationObjectType = deriveObjectType[GraphQlSchemaContext, Duration]()
  implicit val NamespacePrefixObjectType = deriveObjectType[GraphQlSchemaContext, NamespacePrefix]()

  // DefinitionPath
  implicit val DefinitionPathSchemaSlotObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathSchemaSlot](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSchemaSlotById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathStepParticipantObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathStepParticipant](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getStepParticipantById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathStepObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathStep](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getStepById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathSchemaObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathSchema](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSchemaById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathPrimitiveSlotObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathPrimitiveSlot](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getPrimitiveSlotById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathPrimitiveObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathPrimitive](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getPrimitiveById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathSdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathSdfDocument](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.id).map(_.label)),
      Field("namespacePrefixes", OptionType(ListType(NamespacePrefixObjectType)), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.id).map(_.namespacePrefixes))
    )
  )
  implicit val DefinitionPathObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath]()

  // Entity relations
  implicit val EntityRelationRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelationRelation]()
  implicit val EntityRelationObjectType = deriveObjectType[GraphQlSchemaContext, EntityRelation]()

  // Primitive
  implicit val PrimitiveSlotObjectType = deriveObjectType[GraphQlSchemaContext, PrimitiveSlot](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val PrimitiveObjectType = deriveObjectType[GraphQlSchemaContext, Primitive](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )

  // Schema
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

  // Validation message
  implicit val ValidationMessageObjectType = deriveObjectType[GraphQlSchemaContext, ValidationMessage]()

  // SDF document
  implicit lazy val SdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocument](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
      Field("validationMessageTypes", ListType(ValidationMessageTypeEnumType), resolve = _.value.validationMessages.map(_.`type`).distinct)
    )
  )

  // Search
  implicit val SearchDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SearchDocument]()
  implicit val SearchResultsObjectType = deriveObjectType[GraphQlSchemaContext, SearchResults]()

  // Root query
  val RootQueryType = ObjectType("RootQuery", fields[GraphQlSchemaContext, Unit](
    Field("primitiveById", OptionType(PrimitiveObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getPrimitiveById(ctx.args.arg(IdArgument))),
    Field("primitives", ListType(PrimitiveObjectType), resolve = _.ctx.store.getPrimitives),
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
