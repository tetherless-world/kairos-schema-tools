package stores

import scala.concurrent.duration._
import java.io.FileWriter
import java.nio.file.{Files, Path}
import java.util.stream.Collectors

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import javax.inject.{Inject, Named, Singleton}
import models.schema.Schema
import models.search.{SearchDocument, SearchResults}
import validators.Validators

import scala.collection.JavaConverters._
import scala.concurrent.{Await, ExecutionContext}
import scala.io.Source

@Singleton
class FsStore @Inject()(@Named("fsStoreDataDirectoryPath") val dataDirectoryPath: Path, validators: Validators)(implicit ec: ExecutionContext) extends Store with WithResource {
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
    Files.list(dataDirectoryPath).collect(Collectors.toList()).asScala.flatMap(path => {
      if (Files.isRegularFile(path) && path.getFileName.toString.toLowerCase().endsWith(".json")) {
        withResource(Source.fromFile(path.toFile)) { source =>
          Some((path.getFileName.toString, readSdfDocumentFile(path)))
        }
      } else {
        None
      }
    }).toMap

  private def newSdfDocumentFileName(sdfDocument: SdfDocument): String =
    java.security.MessageDigest.getInstance("SHA-1").digest(sdfDocument.id.toString.getBytes("UTF-8")).map((b: Byte) => (if (b >= 0 & b < 16) "0" else "") + (b & 0xFF).toHexString).mkString + ".json"

  final override def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    val fileName = getSdfDocumentsByFileName.find(entry => entry._2.id == sdfDocument.id).map(entry => entry._1).getOrElse(newSdfDocumentFileName(sdfDocument))
    val filePath = dataDirectoryPath.resolve(fileName)
    withResource(new FileWriter(filePath.toFile)) { fileWriter =>
      fileWriter.write(sdfDocument.sourceJson)
    }
    searchEngine.putSdfDocument(sdfDocument)
  }

  final override def putSdfDocuments(sdfDocuments: List[SdfDocument]): Unit =
    sdfDocuments.foreach(putSdfDocument(_))

  private def readSdfDocumentFile(filePath: Path): SdfDocument =
    withResource(Source.fromFile(filePath.toFile)) { source =>
      Await.result(SdfDocument.readAndValidate(source, Uri.parse(filePath.toUri.toString), validators), 10.seconds)
    }

  final override def search(limit: Int, offset: Int, query: String): SearchResults =
    searchEngine.search(limit, offset, query)
}
