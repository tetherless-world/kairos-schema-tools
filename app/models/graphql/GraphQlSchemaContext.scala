package models.graphql

import play.api.mvc.Request
import validators.Validators
import stores.Store
import validators.ksfValidationApi.KsfValidationApi

import scala.concurrent.ExecutionContext

final class GraphQlSchemaContext(val ksfValidationApi: KsfValidationApi, val store: Store, val validators: Validators)(implicit val executionContext: ExecutionContext)
