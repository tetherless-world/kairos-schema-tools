package stores

import org.scalatest.{Matchers, WordSpec}

trait StoreBehaviors extends Matchers { this: WordSpec =>
  val testSchema1 = ExampleData.schemas(0)

  def store(storeFactory: () => Store): Unit = {
    "get a schema by id" in {
      val store = storeFactory()
      store.putSchema(testSchema1)
      store.getSchemaById(testSchema1.id) should equal(Some(testSchema1))
    }

    "get schemas" in {
      val store = storeFactory()
      store.putSchema(testSchema1)
      store.getSchemas should equal(List(testSchema1))
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
