package formats.json

import org.scalatest.{Matchers, WordSpec}
import stores.ConfData

class JsonParserSpec extends WordSpec with Matchers {
  "JSON parser" can {
    "parse the coordinated bombing attack example" in {
      JsonParser.parse(ConfData.coordinatedBombingAttackTa1.sourceJson)
    }
  }
}
