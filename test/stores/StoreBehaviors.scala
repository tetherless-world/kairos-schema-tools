package stores

import edu.rpi.tw.twks.uri.Uri
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
  }
}
