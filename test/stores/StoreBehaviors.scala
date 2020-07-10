package stores

import edu.rpi.tw.twks.uri.Uri
import org.scalatest.{Matchers, WordSpec}

trait StoreBehaviors extends Matchers { this: WordSpec =>
  val testSdfDocument1 = ExampleData.sdfDocuments(0)
  val testSchema1 = ExampleData.schemas(0)

  def store(storeFactory: () => Store): Unit = {
    "get a schema by id" in {
      val store = storeFactory()
      store.getSchemaById(testSchema1.id) should equal(None)
      store.putSchema(testSchema1)
      store.getSchemaById(testSchema1.id) should equal(Some(testSchema1))
      store.getSchemaById(Uri.parse("http://example.com/other")) should equal(None)
    }

    "get schemas" in {
      val store = storeFactory()
      store.getSchemas should equal(List())
      store.putSchema(testSchema1)
      store.getSchemas should equal(List(testSchema1))
    }

    "get SDF document by id" in {
      val store = storeFactory()
      store.getSdfDocumentById(testSdfDocument1.id) should equal(None)
      store.putSdfDocument(testSdfDocument1)
      store.getSdfDocumentById(testSdfDocument1.id) should equal(Some(testSdfDocument1))
      store.getSdfDocumentById(Uri.parse("http://example.com/other")) should equal(None)
    }

    "get SDF documents" in {
      val store = storeFactory()
      store.getSdfDocuments should equal(List())
      store.putSdfDocument(testSdfDocument1)
      store.getSdfDocuments should equal(List(testSdfDocument1))
    }

    "put a schema" in {
      val store = storeFactory()
      store.putSchema(testSchema1)
      store.getSchemaById(testSchema1.id) should equal(Some(testSchema1))
    }

    "put schemas" in {
      val store = storeFactory()
      val expected = List(testSchema1)
      store.putSchemas(expected)
      store.getSchemas should equal(expected)
    }
  }
}
