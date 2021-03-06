package controllers.graphql

import akka.actor.ActorSystem
import io.github.tetherlessworld.twxplore.lib.base.controllers.graphql.BaseGraphQlController
import javax.inject.{Inject, Singleton}
import models.graphql.{GraphQlSchemaContext, GraphQlSchemaDefinition}
import play.api.mvc.Request
import validators.Validators
import stores.Store
import validators.ksfValidationApi.KsfValidationApi

import scala.concurrent.ExecutionContext

@Singleton
class GraphQlController @Inject()(ksfValidationApi: KsfValidationApi, store: Store, system: ActorSystem, validators: Validators)(implicit ec: ExecutionContext) extends BaseGraphQlController[GraphQlSchemaContext](GraphQlSchemaDefinition.schema, system) {
  override protected def getContext(request: Request[_]): GraphQlSchemaContext = new GraphQlSchemaContext(ksfValidationApi, store, validators)
}
