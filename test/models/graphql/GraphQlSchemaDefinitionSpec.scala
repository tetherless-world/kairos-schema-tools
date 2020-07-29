package models.graphql

import org.scalatestplus.play.PlaySpec
import play.api.libs.json.{JsObject, Json}
import play.api.test.FakeRequest
import sangria.ast.Document
import sangria.execution.Executor
import sangria.marshalling.playJson._
import stores.{ConfData, TestStore}
import sangria.macros._
import validators.Validators
import validators.ksfValidationApi.DummyKsfValidationApi

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class GraphQlSchemaDefinitionSpec extends PlaySpec {
  "GraphQL schema" must {
    "get schemas" in {
      val query =
        graphql"""
          query SchemasQuery {
            schemas {
              id
              name
            }
          }
          """
      val result = Json.stringify(executeQuery(query))
      for (schema <- ConfData.schemas) {
        result must include(schema.id.toString)
        result must include(schema.name)
      }
    }

    "get schema by id" in {
      val query =
        graphql"""
          query SchemaByIdQuery($$id: String!) {
            schemaById(id: $$id) {
              name
            }
          }
          """
      val expected = ConfData.schemas(0)
      executeQuery(query, vars = Json.obj("id" -> expected.id.toString)) must be(Json.parse(
        s"""
           |{"data":{"schemaById":{"name":"${expected.name}"}}}
           |""".stripMargin))
    }

    "get SDF documents" in {
      val query =
        graphql"""
          query SdfDocumentsQuery {
            sdfDocuments {
              id
              sourceJson
            }
          }
          """
      val result = Json.stringify(executeQuery(query))
      for (sdfDoc <- ConfData.sdfDocuments) {
        result must include(sdfDoc.id.toString)
        result must include("@id")
      }
    }

    "get SDF document by id" in {
      val query =
        graphql"""
          query SdfDocumentByIdQuery($$id: String!) {
            sdfDocumentById(id: $$id) {
              id
            }
          }
          """
      val expected = ConfData.sdfDocuments(0)
      executeQuery(query, vars = Json.obj("id" -> expected.id.toString)) must be(Json.parse(
        s"""
           |{"data":{"sdfDocumentById":{"id":"${expected.id}"}}}
           |""".stripMargin))
    }

    "search" in {
      val query =
        graphql"""
          query SearchQuery($$query: String!) {
            search(limit: 10, offset: 0, query: $$query) {
              documents {
                label
                sdfDocumentId
                type
              }
              total
            }
          }
          """
      val sdfDocument = ConfData.sdfDocuments(0)
      val result = Json.stringify(executeQuery(query, vars = Json.obj("query" -> sdfDocument.name)))
      result must include(sdfDocument.name)
      result must include(sdfDocument.id.toString)
    }

    "validate SDF document" in {
      val query =
        graphql"""
          query ValidateSdfDocumentQuery($$json: String!) {
            validateSdfDocument(json: $$json) {
              errorsList
              warningsList
            }
          }
          """
      val sdfDocument = ConfData.sdfDocuments(0)
      val result = Json.stringify(executeQuery(query, vars = Json.obj("json" -> sdfDocument.sourceJson)))
      result must include("errorsList")
    }
  }

  def executeQuery(query: Document, vars: JsObject = Json.obj()) = {
    val futureResult = Executor.execute(GraphQlSchemaDefinition.schema, query,
      variables = vars,
      userContext =
        new GraphQlSchemaContext(
          request = FakeRequest(),
          store = new TestStore,
          validators = new Validators(new DummyKsfValidationApi),
        )
    )
    Await.result(futureResult, 10.seconds)
  }
}
