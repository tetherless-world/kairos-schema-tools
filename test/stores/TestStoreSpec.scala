package stores

import org.scalatest.{Matchers, WordSpec}
import stores.TestStore

class TestStoreSpec extends WordSpec with Matchers {
  "Test store" can {
    "instantiate with data" in {
      val store = new TestStore()
    }
  }
}
