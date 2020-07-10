package stores

import org.scalatest.WordSpec

class MemStoreSpec extends WordSpec with StoreBehaviors {
  behave like store(() => new MemStore)
}
