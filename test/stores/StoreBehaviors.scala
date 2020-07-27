package stores

import edu.rpi.tw.twks.uri.Uri
import models.search.SearchDocumentType
import org.scalatest.{Matchers, WordSpec}

trait StoreBehaviors extends Matchers { this: WordSpec =>
  val testSdfDocument1 = ExampleData.sdfDocuments(0)
  val testSchema1 = testSdfDocument1.schemas(0)

  def store(storeFactory: () => Store): Unit = {
    "get a schema by id" in {
      val store = storeFactory()
      store.getSchemaById(testSchema1.id) should equal(None)
      store.putSdfDocument(testSdfDocument1)
      store.getSchemaById(testSchema1.id).get.id should equal(testSchema1.id)
      store.getSchemaById(Uri.parse("http://example.com/other")) should equal(None)
    }

    "get schemas" in {
      val store = storeFactory()
      store.getSchemas should equal(List())
      store.putSdfDocument(testSdfDocument1)
      store.getSchemas.map(_.id) should equal(testSdfDocument1.schemas.map(_.id))
    }

    "get SDF document by id" in {
      val store = storeFactory()
      store.getSdfDocumentById(testSdfDocument1.id) should equal(None)
      store.putSdfDocument(testSdfDocument1)
      store.getSdfDocumentById(testSdfDocument1.id).get.id should equal(testSdfDocument1.id)
      store.getSdfDocumentById(Uri.parse("http://example.com/other")) should equal(None)
    }

    "get SDF documents" in {
      val store = storeFactory()
      store.getSdfDocuments should equal(List())
      store.putSdfDocument(testSdfDocument1)
      store.getSdfDocuments.map(_.id) should equal(List(testSdfDocument1.id))
    }

    "search for an SDF document" in {
      val store = storeFactory()
      store.putSdfDocument(testSdfDocument1)
      val results = store.search(limit = 10, offset = 0, query = "\"" + testSdfDocument1.name + "\"")
      results.total should be > 0
      results.documents.size should be > 0
      results.documents.exists(document => document.`type` == SearchDocumentType.SdfDocument && document.label == testSdfDocument1.name && document.sdfDocumentId == testSdfDocument1.id) should be(true)
    }

    "search for a schema" in {
      val store = storeFactory()
      store.putSdfDocument(testSdfDocument1)
      val results = store.search(limit = 10, offset = 0, query = testSchema1.name)
      results.total should be > 0
      results.documents.size should be > 0
      results.documents.exists(
        document =>
          document.`type` == SearchDocumentType.Schema &&
            document.label == testSchema1.name &&
            document.sdfDocumentId == testSchema1.sdfDocumentId &&
            document.schemaId == Some(testSchema1.id)
      ) should be(true)
    }

  }
}
