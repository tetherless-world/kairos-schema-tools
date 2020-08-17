package stores

import scala.concurrent.duration._
import java.io.{FileWriter, IOException}
import java.nio.file.attribute.BasicFileAttributes
import java.nio.file.{FileVisitResult, FileVisitor, Files, Path, SimpleFileVisitor}
import java.util.stream.Collectors

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.{SdfDocument, SdfDocumentReader}
import io.github.tetherlessworld.twxplore.lib.base.WithResource
import javax.inject.{Inject, Named, Singleton}
import models.schema.Schema
import models.search.{SearchDocument, SearchResults}
import validators.Validators

import scala.collection.JavaConverters._
import scala.collection.mutable
import scala.concurrent.{Await, ExecutionContext}
import scala.io.Source

@Singleton
class FsStore @Inject()(@Named("fsStoreDataDirectoryPath") val dataDirectoryPath: Path, validators: Validators)(implicit ec: ExecutionContext) extends Store with WithResource {
  private val searchEngine = new SearchEngine

  private def deleteSdfDocumentByFilePath(filePath: Path) = {
    Files.delete(filePath)
  }

  final override def deleteSdfDocumentById(id: Uri): Unit =
    getSdfDocumentsByFilePath.find(entry => entry._2.id == id).map(_._1).foreach(deleteSdfDocumentByFilePath(_))

  final override def deleteSdfDocuments(): Unit =
    getSdfDocumentsByFilePath.map(_._1).foreach(deleteSdfDocumentByFilePath(_))

  final override def getSchemaById(id: Uri): Option[Schema] =
    getSchemas.find(_.id == id)

  final override def getSchemas: List[Schema] =
    getSdfDocuments.flatMap(sdfDocument => sdfDocument.schemas)

  final override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    getSdfDocuments.find(_.id == id)

  final override def getSdfDocuments: List[SdfDocument] =
    getSdfDocumentsByFilePath.values.toList

  private def getSdfDocumentsByFilePath: Map[Path, SdfDocument] = {
    val sdfDocumentsByFilePath = new mutable.HashMap[Path, SdfDocument]
    Files.walkFileTree(dataDirectoryPath, new SimpleFileVisitor[Path] {
      override def visitFile(filePath: Path, attrs: BasicFileAttributes): FileVisitResult = {
        if (Files.isRegularFile(filePath) && filePath.getFileName.toString.toLowerCase().endsWith(".json")) {
          withResource(Source.fromFile(filePath.toFile)) { source =>
            sdfDocumentsByFilePath.update(filePath, readSdfDocumentFile(filePath))
          }
        }
        FileVisitResult.CONTINUE
      }
    })
    sdfDocumentsByFilePath.toMap
  }

  private def newSdfDocumentFileName(sdfDocument: SdfDocument): String =
    java.security.MessageDigest.getInstance("SHA-1").digest(sdfDocument.id.toString.getBytes("UTF-8")).map((b: Byte) => (if (b >= 0 & b < 16) "0" else "") + (b & 0xFF).toHexString).mkString + ".json"

  final override def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    val filePath = getSdfDocumentsByFilePath.find(entry => entry._2.id == sdfDocument.id).map(entry => entry._1).getOrElse(dataDirectoryPath.resolve(newSdfDocumentFileName(sdfDocument)))
    withResource(new FileWriter(filePath.toFile)) { fileWriter =>
      fileWriter.write(sdfDocument.sourceJson)
    }
    searchEngine.putSdfDocument(sdfDocument)
  }

  override def putSdfDocuments(sdfDocuments: List[SdfDocument]): Unit =
    sdfDocuments.foreach(putSdfDocument(_))

  private def readSdfDocumentFile(filePath: Path): SdfDocument =
    withResource(Source.fromFile(filePath.toFile)) { source =>
      SdfDocument.read(source, Uri.parse(filePath.toUri.toString))
    }

  final override def search(limit: Int, offset: Int, query: String): SearchResults =
    searchEngine.search(limit, offset, query)
}
