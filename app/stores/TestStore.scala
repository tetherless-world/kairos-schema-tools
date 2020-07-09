package stores

import formats.sdf.SchemaDataFormatDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

final class TestStore extends MemStore {
  putSchemas(ExampleDataResources.coordinatedBombingAttackTa1Json)

  private def putSchemas(schemaDataFormatJson: String): Unit = {
    for (schema <- SchemaDataFormatDocumentReader.read(schemaDataFormatJson).schemas) {
      putSchema(schema)
    }
  }
}
