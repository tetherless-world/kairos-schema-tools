package models.graphql

import formats.sdf.SdfDocument
import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import models.schema.{Duration, EntityType, Slot, Step}
import sangria.schema.{Argument, Field, ListType, ObjectType, OptionType, Schema, StringType, fields}
import sangria.macros.derive._

object GraphQlSchemaDefinition extends BaseGraphQlSchemaDefinition {
  // Scalar arguments
  val IdArgument = Argument("id", UriType)

  // Object types
  implicit val DurationObjectType = deriveObjectType[GraphQlSchemaContext, Duration]()
  implicit val EntityTypeEnumType = deriveEnumType[EntityType]()
  implicit val SlotObjectType = deriveObjectType[GraphQlSchemaContext, Slot]()
  implicit val StepObjectType = deriveObjectType[GraphQlSchemaContext, Step]()
  implicit val SchemaObjectType = deriveObjectType[GraphQlSchemaContext, models.schema.Schema]()
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
    RootQueryType
  )
}
