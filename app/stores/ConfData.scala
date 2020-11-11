package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocumentReader
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.sdfDocument.SdfDocument

import scala.io.Source

object ConfData extends WithResource {

  private def readSdfDocumentResource(resourceName: String): Option[SdfDocument] = {
    val resourcePath = "/data/" + resourceName
    val resourceInputStream = getClass.getResourceAsStream(resourcePath)
    if (resourceInputStream == null) {
      return None
    }
    val resourceUri = Uri.parse(getClass.getResource(resourcePath).toURI.toString)
    val json =
      withResource(resourceInputStream) { inputStream =>
        Source.fromInputStream(inputStream, "UTF-8").mkString
      }
    Some(SdfDocumentReader.read(json, resourceUri))
  }

  val coordinatedBombingAttackTa1 = readSdfDocumentResource("examples/coordinated-bombing-attack-ta1.json").get
//  val makeIedTa1 = readSdfDocumentResource("make_ied_sdf0.8c.json")
  val wtcTa2 = readSdfDocumentResource("examples/wtc1993-ta2.json").get

  val sdfDocuments = List(coordinatedBombingAttackTa1, wtcTa2)
  val primitives = sdfDocuments.flatMap(_.primitives)
  val schemas = sdfDocuments.flatMap(_.schemas)
}
