package formats

import java.io.StringReader

import formats.sdf.SchemaDataFormatReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import org.scalatest.{Matchers, WordSpec}
import stores.ExampleDataResources

class SchemaDataFormatReaderSpec extends WordSpec with Matchers with WithResource {
  "Schema data format reader" can {
    "read the coordinated bombing attack TA1 example" in {
      withResource(new SchemaDataFormatReader(new StringReader(ExampleDataResources.coordinatedBombingAttackTa1Json))) { reader =>
        val schemas = reader.read()
        schemas.size should equal(1)
        val schema = schemas(0)
        schema.description should be("A coordinated effort by mulitple parties that results in a bombing attack")
        schema.name should be("Coordinated Bombing Attack")
      }
    }
  }
}
