package stores

import formats.sdf.SdfDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

final class TestStore extends MemStore {
  putSchemas(ExampleData.schemas)
}
