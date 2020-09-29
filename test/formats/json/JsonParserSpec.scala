package formats.json

import org.scalatest.{Matchers, WordSpec}
import stores.ConfData

class JsonParserSpec extends WordSpec with Matchers {
  "JSON parser" can {
    "parse number with leading 0" in {
      val parsed = JsonParser.parse("{\"x\": 0.9}")
      parsed should not equal(null)
    }

    "parse the coordinated bombing attack example" in {
      val parsed = JsonParser.parse(ConfData.coordinatedBombingAttackTa1.sourceJson)
      parsed should not equal(null)
    }
  }
}
