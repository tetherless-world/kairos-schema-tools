package stores

import formats.sdf.SchemaDataFormatDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

object ExampleData extends WithResource {
  private def readJsonFileResource(resourceName: String): String = {
    withResource(getClass.getResourceAsStream("/data/examples/" + resourceName)) { inputStream =>
      Source.fromInputStream(inputStream, "UTF-8").mkString
    }
  }

  val coordinatedBombingAttackTa1Json = readJsonFileResource("coordinated-bombing-attack-ta1.json")
  val coordinatedBombingAttackTa1Schemas = SchemaDataFormatDocumentReader.read(coordinatedBombingAttackTa1Json).schemas

  val schemas = coordinatedBombingAttackTa1Schemas
}
