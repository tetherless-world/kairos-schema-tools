package validators

import org.scalatest.WordSpec
import stores.ConfData

class ParticipantRefvarConstraintsValidatorSpec extends WordSpec {
  "The validator" must {
    "validate the TA1 example" in {
      ParticipantRefvarConstraintsValidator.validateSdfDocument(ConfData.coordinatedBombingAttackTa1)
    }

    "validate the TA2 example" in {
      ParticipantRefvarConstraintsValidator.validateSdfDocument(ConfData.wtcTa2)
    }
  }
}
