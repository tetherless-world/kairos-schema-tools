package models.graphql

import formats.sdf.SchemaDataFormatDocument
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
  implicit val SchemaDataFormatDocumentObjectType = deriveObjectType[GraphQlSchemaContext, SchemaDataFormatDocument]()

  // Root query
  val RootQueryType = ObjectType("RootQuery",  fields[GraphQlSchemaContext, Unit](
    Field("schemas", ListType(SchemaObjectType), resolve = ctx => ctx.ctx.store.getSchemas),
    Field("schemaById", OptionType(SchemaObjectType), arguments = IdArgument :: Nil, resolve = ctx => ctx.ctx.store.getSchemaById(ctx.args.arg(IdArgument)))
  ))

  // Schema
  val schema = Schema(
    RootQueryType
  )
}
