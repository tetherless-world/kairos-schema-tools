package formats

import java.io.StringReader

import io.github.tetherlessworld.twxplore.lib.base.WithResource
import org.scalatest.{Matchers, WordSpec}
import stores.ExampleDataResources

import scala.io.Source

class SchemaDataFormatReaderSpec extends WordSpec with Matchers with WithResource {
  "Schema data format reader" can {
    "read the example data" in {
      withResource(new SchemaDataFormatReader(new StringReader(ExampleDataResources.coordinatedBombingAttackTa1Json))) { reader =>
        reader.read()
      }
    }
  }
}
