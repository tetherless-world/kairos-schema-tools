package validators

import org.scalatest.WordSpec
import org.scalatestplus.play.PlaySpec
import play.api.Configuration
import stores.ConfData

class ChronosOntologyValidatorSpec extends WordSpec {
  "The validator" must {
    val sut = new ChronosOntologyValidator(Configuration())

    "validate the TA1 example" in {
      if (sut.enabled) {
        sut.validateSdfDocument(ConfData.coordinatedBombingAttackTa1)
      }
    }

    "validate the TA2 example" in {
      if (sut.enabled) {
        sut.validateSdfDocument(ConfData.wtcTa2)
      }
    }
  }
}
