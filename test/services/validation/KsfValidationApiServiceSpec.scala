package services.validation

import org.scalatest.{Matchers, WordSpec}
import play.api.test.WsTestClient
import stores.ExampleData

import scala.concurrent.Await
import scala.concurrent.duration._

class KsfValidationApiServiceSpec extends WordSpec with Matchers {
  import scala.concurrent.ExecutionContext.Implicits.global

  "KSF validation API" can {
    "validate the coordinated bombing attack TA1 example" in {
      WsTestClient.withClient(ws => {
        val results = Await.result(new KsfValidationApiService(ws).validate(ExampleData.coordinatedBombingAttackTa1.sourceJson), 30.seconds)
      })
    }
  }
}
