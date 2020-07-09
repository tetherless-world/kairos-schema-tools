package stores

import formats.sdf.SchemaDataFormatDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

final class TestStore extends MemStore {
  putSchemas(ExampleData.coordinatedBombingAttackTa1Schemas)
}
