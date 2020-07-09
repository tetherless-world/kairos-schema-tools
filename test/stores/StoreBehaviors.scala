package stores

import formats.sdf.SchemaDataFormatDocumentReader
import org.scalatest.{Matchers, WordSpec}
import stores.Store

trait StoreBehaviors extends Matchers { this: WordSpec =>
  val testSchema1 = SchemaDataFormatDocumentReader.read(ExampleDataResources.coordinatedBombingAttackTa1Json).schemas(0)

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
  }
}
