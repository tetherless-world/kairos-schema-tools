package stores

import org.scalatest.{BeforeAndAfterEach, WordSpec}

class MemStoreSpec extends WordSpec with StoreBehaviors with BeforeAndAfterEach {
  behave like store(() => new MemStore)
}
