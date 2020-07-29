package stores

import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.WithResource

import scala.io.Source

object ConfData extends WithResource {
  private def readSdfDocumentResource(resourceName: String): Option[SdfDocument] = {
    val resourcePath = "/data/" + resourceName
    val resourceInputStream = getClass.getResourceAsStream(resourcePath)
    if (resourceInputStream == null) {
      return None
    }
    val json =
      withResource(resourceInputStream) { inputStream =>
        Source.fromInputStream(inputStream, "UTF-8").mkString
      }
    Some(SdfDocumentReader.read(json))
  }

  val coordinatedBombingAttackTa1 = readSdfDocumentResource("coordinated-bombing-attack-ta1.json").get
  val makeIedTa1 = readSdfDocumentResource("make_ied_sdf0.8c.json")

  val sdfDocuments = List(coordinatedBombingAttackTa1) ++ makeIedTa1.toList
  val schemas = sdfDocuments.flatMap(_.schemas)
}
