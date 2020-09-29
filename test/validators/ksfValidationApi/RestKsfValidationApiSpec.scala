package validators.ksfValidationApi

import org.scalatest.{Matchers, WordSpec}
import play.api.test.WsTestClient
import stores.ConfData

import scala.concurrent.Await
import scala.concurrent.duration._

class RestKsfValidationApiSpec extends WordSpec with Matchers {
  import scala.concurrent.ExecutionContext.Implicits.global

  "KSF validation API" can {
//    "show the human readable form of the bombing attack TA1 example" in {
//      WsTestClient.withClient(ws => {
//        val results = Await.result(new RestKsfValidationApi(ws).getAnnotationReadableForm(ConfData.coordinatedBombingAttackTa1), 30.seconds)
//        results should not contain("ERROR")
//      })
//    }
//
//    "validate the coordinated bombing attack TA1 example" in {
//      WsTestClient.withClient(ws => {
//        val results = Await.result(new RestKsfValidationApi(ws).validateSdfDocument(ConfData.coordinatedBombingAttackTa1), 30.seconds)
//      })
//    }
  }
}
