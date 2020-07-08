package stores

import org.scalatest.{Matchers, WordSpec}
import stores.Store

trait StoreBehaviors extends Matchers { this: WordSpec =>
  def store(sut: Store) {
  }
}
