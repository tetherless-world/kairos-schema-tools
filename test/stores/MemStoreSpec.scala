package stores

import org.scalatest.WordSpec
import stores.TestStore

class MemStoreSpec extends WordSpec with StoreBehaviors {
  behave like store(new TestStore)
}
