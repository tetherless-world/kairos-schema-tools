package stores

import java.io.StringReader

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

object ExampleData extends WithResource {
  private def readSdfDocumentResource(resourceName: String): SdfDocument = {
    val resourcePath = "/data/examples/" + resourceName
    val json =
      withResource(getClass.getResourceAsStream(resourcePath)) { inputStream =>
        Source.fromInputStream(inputStream, "UTF-8").mkString
      }
    val uri = Uri.parse(getClass.getResource(resourcePath).toString)
    SdfDocumentReader.read(uri, json)
  }

  val coordinatedBombingAttackTa1 = readSdfDocumentResource("coordinated-bombing-attack-ta1.json")

  val schemas = coordinatedBombingAttackTa1.schemas
}
