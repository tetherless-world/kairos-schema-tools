package models.graphql

import io.github.tetherlessworld.twxplore.lib.base.models.graphql.BaseGraphQlSchemaDefinition
import sangria.schema.{ObjectType, Schema, fields}

object GraphQlSchemaDefinition extends BaseGraphQlSchemaDefinition {
  val RootQueryType = ObjectType("RootQuery",  fields[GraphQlSchemaContext, Unit](
  ))

  // Schema
  val schema = Schema(
    RootQueryType
  )
}
