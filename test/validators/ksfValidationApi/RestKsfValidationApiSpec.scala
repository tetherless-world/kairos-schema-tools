package validators.ksfValidationApi

import org.scalatest.{Matchers, WordSpec}
import play.api.test.WsTestClient
import stores.ConfData

import scala.concurrent.Await
import scala.concurrent.duration._

class RestKsfValidationApiSpec extends WordSpec with Matchers {
  import scala.concurrent.ExecutionContext.Implicits.global

  "KSF validation API" can {
    "validate the coordinated bombing attack TA1 example" in {
      WsTestClient.withClient(ws => {
        val results = Await.result(new RestKsfValidationApi(ws).validateSdfDocument(ConfData.coordinatedBombingAttackTa1), 30.seconds)
      })
    }
  }
}
