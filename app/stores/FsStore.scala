package stores

import java.io.FileWriter
import java.nio.file.{Files, Path}
import java.util.stream.Collectors

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import models.schema.Schema
import models.search.{SearchDocument, SearchResults}

import scala.collection.JavaConverters._
import scala.io.Source

final class FsStore(val rootDirectoryPath: Path) extends Store with WithResource {
  private val searchEngine = new SearchEngine

  final override def getSchemaById(id: Uri): Option[Schema] =
    getSchemas.find(_.id == id)

  final override def getSchemas: List[Schema] =
    getSdfDocuments.flatMap(sdfDocument => sdfDocument.schemas)

  final override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    getSdfDocuments.find(_.id == id)

  final override def getSdfDocuments: List[SdfDocument] =
    getSdfDocumentsByFileName.values.toList

  private def getSdfDocumentsByFileName: Map[String, SdfDocument] =
    Files.list(rootDirectoryPath).collect(Collectors.toList()).asScala.flatMap(path => {
      if (Files.isRegularFile(path) && path.getFileName.toString.toLowerCase().endsWith(".json")) {
        withResource(Source.fromFile(path.toFile)) { source =>
          Some((path.getFileName.toString, new SdfDocumentReader(source, Uri.parse(path.toUri.toString)).read()))
        }
      } else {
        None
      }
    }).toMap

  private def newSdfDocumentFileName(sdfDocument: SdfDocument): String =
    java.security.MessageDigest.getInstance("SHA-1").digest(sdfDocument.id.toString.getBytes("UTF-8")).map((b: Byte) => (if (b >= 0 & b < 16) "0" else "") + (b & 0xFF).toHexString).mkString + ".json"

  final override def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    val fileName = getSdfDocumentsByFileName.find(entry => entry._2.id == sdfDocument.id).map(entry => entry._1).getOrElse(newSdfDocumentFileName(sdfDocument))
    val filePath = rootDirectoryPath.resolve(fileName)
    withResource(new FileWriter(filePath.toFile)) { fileWriter =>
      fileWriter.write(sdfDocument.sourceJson)
    }
    searchEngine.putSdfDocument(sdfDocument)
  }

  final override def putSdfDocuments(sdfDocuments: List[SdfDocument]): Unit =
    sdfDocuments.foreach(putSdfDocument(_))

  final override def search(limit: Int, offset: Int, query: String): SearchResults =
    searchEngine.search(limit, offset, query)
}
