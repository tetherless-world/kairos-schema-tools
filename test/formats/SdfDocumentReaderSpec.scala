package formats

import java.io.StringReader

import formats.sdf.SdfDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import org.scalatest.{Matchers, WordSpec}
import stores.ExampleData

import scala.io.Source

class SdfDocumentReaderSpec extends WordSpec with Matchers with WithResource {
  "Schema data format reader" can {
    "read the coordinated bombing attack TA1 example" in {
      withResource(new SdfDocumentReader(ExampleData.coordinatedBombingAttackTa1.id, Source.fromString(ExampleData.coordinatedBombingAttackTa1.sourceJson))) { reader =>
        val document = reader.read()
        val schemas = document.schemas
        schemas.size should equal(1)
        val schema = schemas(0)
//        schema.aka should not be None
//        for (aka <- schema.aka.get) {
//          schema.aka should not be empty
//        }
        schema.comments should not be None
        // schema has empty comment
//        for (comment <- schema.comments.get) {
//          comment should not be empty
//        }
        schema.description should be("A coordinated effort by mulitple parties that results in a bombing attack")
        schema.name should be("Coordinated Bombing Attack")
        schema.steps should not be empty
        for (step <- schema.steps) {
          step.name should not be empty
          step.participants should not be None
          val participants = step.participants.get
          participants should not be empty
          for (participant <- participants) {
            participant.name should not be empty
            participant.entityTypes.get should not be empty
          }
        }
        for (aka <- schema.steps.find(_.aka.isDefined).get.aka.get) {
          aka should not be empty
        }
        for (comment <- schema.steps.find(_.comments.isDefined).get.comments.get) {
          comment should not be empty
        }
        schema.steps.exists(_.references.isDefined) should be(true)
        schema.steps.exists(_.maxDuration.isDefined) should be (true)
        schema.steps.exists(_.minDuration.isDefined) should be (true)
        schema.`super` should not be None
        schema.ta2 should be (false)
        schema.version should equal("caci-07.02.2020")
      }
    }
  }
}
