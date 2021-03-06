package models.graphql

import java.util.UUID

import edu.rpi.tw.twks.uri.Uri
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.json.{JsonNodeLocation, JsonTokenLocation}
import models.schema._
import models.sdfDocument.{NamespacePrefix, SdfDocument}
import models.search.{SearchDocument, SearchDocumentType, SearchResults}
import models.validation.{ValidationMessage, ValidationMessageType}
import sangria.macros.derive._
import sangria.schema.{Argument, Field, FloatType, IntType, InterfaceType, ListType, ObjectType, OptionType, Schema, StringType, fields}

import scala.util.{Failure, Success}

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
  implicit val ModalityEnumType = deriveEnumType[Modality]()
  implicit val OrderFlagEnumType = deriveEnumType[OrderFlag]()
  implicit val SearchDocumentTypeEnumType = deriveEnumType[SearchDocumentType]()
  implicit val ValidationMessageTypeEnumType = deriveEnumType[ValidationMessageType]()

  // Interface types
  val OrderInterfaceType: InterfaceType[GraphQlSchemaContext, Order] =
    InterfaceType(
      "Order",
      fields[GraphQlSchemaContext, Order](
        Field("comments", OptionType(ListType(StringType)), resolve = _.value.comments),
        Field("confidence", OptionType(FloatType), resolve = _.value.confidence),
        Field("flags", OptionType(ListType(OrderFlagEnumType)), resolve = _.value.flags),
        Field("id", OptionType(UriType), resolve = _.value.id),
        Field("index", IntType, resolve = _.value.index),
        Field("label", StringType, resolve = _.value.label),
        Field("provenances", OptionType(ListType(StringType)), resolve = _.value.provenances),
        Field("ta1ref", OptionType(UriType), resolve = _.value.ta1ref)
      )
    )

  // Object types

  // JSON
  implicit val JsonTokenLocationObjectType = deriveObjectType[GraphQlSchemaContext, JsonTokenLocation]()
  implicit val JsonNodeLocationObjectType = deriveObjectType[GraphQlSchemaContext, JsonNodeLocation]()

  // DateTime
  implicit val DateTimeObjectType = deriveObjectType[GraphQlSchemaContext, DateTime]()

  // Duration
  implicit val DurationObjectType = deriveObjectType[GraphQlSchemaContext, Duration]()

  // NamespacePrefix
  implicit val NamespacePrefixObjectType = deriveObjectType[GraphQlSchemaContext, NamespacePrefix]()

  // DefinitionPath
  implicit val DefinitionPathEntityObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathEntity](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getEntityById(ctx.value.id).map(_.label))
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
  implicit val DefinitionPathProvenanceDataObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathProvenanceDataObject](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getProvenanceDataObjectById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathSchemaSlotObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathSchemaSlot](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSchemaSlotById(ctx.value.id).map(_.label))
    )
  )
  implicit val DefinitionPathParticipantObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathParticipant](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getParticipantById(ctx.value.id).map(_.label))
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
 implicit val DefinitionPathSdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath.DefinitionPathSdfDocument](
    AddFields(
      Field("label", OptionType(StringType), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.id).map(_.label)),
      Field("namespacePrefixes", OptionType(ListType(NamespacePrefixObjectType)), resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.value.id).map(_.namespacePrefixes))
    )
  )
  implicit val DefinitionPathObjectType = deriveObjectType[GraphQlSchemaContext, DefinitionPath]()

  // Entity types
  implicit val EntityTypesObjectType = deriveObjectType[GraphQlSchemaContext, EntityTypes]()

  // Entity
  implicit val EntityObjectType = deriveObjectType[GraphQlSchemaContext, Entity](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )

  // Entity relation
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
  implicit val BeforeAfterOrderObjectType = deriveObjectType[GraphQlSchemaContext, BeforeAfterOrder](
    Interfaces(OrderInterfaceType)
  )
  implicit val ContainerContainedOrderObjectType = deriveObjectType[GraphQlSchemaContext, ContainerContainedOrder](
    Interfaces(OrderInterfaceType)
  )
  implicit val OverlapsOrderObjectType = deriveObjectType[GraphQlSchemaContext, OverlapsOrder](
    Interfaces(OrderInterfaceType)
  )
  implicit val ProvenanceDataObjectObjectType = deriveObjectType[GraphQlSchemaContext, ProvenanceDataObject](
    AddFields(
      Field("label", StringType, resolve = _.value.label)
    )
  )
  implicit val TemporalObjectObjectType = deriveObjectType[GraphQlSchemaContext, TemporalObject]()
  implicit val ValueObjectType = deriveObjectType[GraphQlSchemaContext, Value](
    AddFields(
      Field("label", StringType, resolve = _.value.entity.toString)
    )
  )
  implicit val ParticipantObjectType = deriveObjectType[GraphQlSchemaContext, Participant](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val StepObjectType = deriveObjectType[GraphQlSchemaContext, Step](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    )
  )
  implicit val StepsObjectType = deriveObjectType[GraphQlSchemaContext, Steps]()
  implicit val SchemaObjectType = deriveObjectType[GraphQlSchemaContext, models.schema.Schema](
    AddFields(
      Field("label", StringType, resolve = _.value.label),
    ),
    ReplaceField("order", Field("order", ListType(OrderInterfaceType), resolve = _.value.order))
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
    Field("getSdfDocumentAnnotatorReadableForm", StringType, arguments = JsonArgument :: Nil, resolve = ctx => {
      implicit val ec = ctx.ctx.executionContext
      val sdfDocument = SdfDocument.read(sourceJson = ctx.args.arg(JsonArgument), sourceUri = newUuidUri)
      ctx.ctx.ksfValidationApi.getAnnotationReadableForm(sdfDocument).transform(result => result match {
        case Success(result) => Success(result)
        case Failure(e) => Success(e.getMessage)
      })
    }),
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
    additionalTypes = BeforeAfterOrderObjectType :: ContainerContainedOrderObjectType :: OverlapsOrderObjectType :: Nil
  )
}
