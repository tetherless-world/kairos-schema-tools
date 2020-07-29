package services.validation

import org.scalatest.{Matchers, WordSpec}
import play.api.test.WsTestClient
import stores.ConfData

import scala.concurrent.Await
import scala.concurrent.duration._

class RestKsfValidationApiServiceSpec extends WordSpec with Matchers {
  import scala.concurrent.ExecutionContext.Implicits.global

  "KSF validation API" can {
    "validate the coordinated bombing attack TA1 example" in {
      WsTestClient.withClient(ws => {
        val results = Await.result(new RestKsfValidationApiService(ws).validate(ConfData.coordinatedBombingAttackTa1.sourceJson), 30.seconds)
      })
    }
  }
}
