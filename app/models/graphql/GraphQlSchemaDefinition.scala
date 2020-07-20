package models.graphql

import formats.sdf.SdfDocument
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.schema.{BeforeAfterStepOrder, ContainerContainedStepOrder, Duration, EntityType, OverlapsStepOrder, Slot, Step, StepOrder, StepOrderFlag}
import sangria.schema.{Argument, Field, InterfaceType, ListType, ObjectType, OptionType, Schema, StringType, fields}
import sangria.macros.derive._

object GraphQlSchemaDefinition extends BaseGraphQlSchemaDefinition {
  // Scalar arguments
  val IdArgument = Argument("id", UriType)

  // Enum types
  implicit val EntityTypeEnumType = deriveEnumType[EntityType]()
  implicit val StepOrderFlagEnumType = deriveEnumType[StepOrderFlag]()

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
  implicit val StepObjectType = deriveObjectType[GraphQlSchemaContext, Step]()
  implicit val SchemaObjectType = deriveObjectType[GraphQlSchemaContext, models.schema.Schema](
    ReplaceField("order", Field("order", ListType(StepOrderInterfaceType), resolve = _.value.order))
  )
  implicit val SdfDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SdfDocument](
    AddFields(
      Field("name", StringType, resolve = ctx => {
        if (!ctx.value.schemas.isEmpty) {
          ctx.value.schemas(0).name
        } else {
          ctx.value.id.toString
        }
      })
    )
  )

  // Root query
  val RootQueryType = ObjectType("RootQuery",  fields[GraphQlSchemaContext, Unit](
    Field("schemas", ListType(SchemaObjectType), resolve = _.ctx.store.getSchemas),
    Field("schemaById", OptionType(SchemaObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSchemaById(ctx.args.arg(IdArgument))),
    Field("sdfDocumentById", OptionType(SdfDocumentObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSdfDocumentById(ctx.args.arg(IdArgument))),
    Field("sdfDocuments", ListType(SdfDocumentObjectType), resolve = _.ctx.store.getSdfDocuments),
  ))

  // Schema
  val schema = Schema(
    RootQueryType,
    additionalTypes = BeforeAfterStepOrderObjectType :: ContainerContainedStepOrderObjectType :: OverlapsStepOrderObjectType :: Nil
  )
}
