package stores

import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

object ExampleDataResources extends WithResource {
  private def readJsonFileResource(resourceName: String): String = {
    withResource(getClass.getResourceAsStream("/data/examples/" + resourceName)) { inputStream =>
      Source.fromInputStream(inputStream, "UTF-8").mkString
    }
  }

  val coordinatedBombingAttackTa1Json = readJsonFileResource("coordinated-bombing-attack-ta1.json")
}
