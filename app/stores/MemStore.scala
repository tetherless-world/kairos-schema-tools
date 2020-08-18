package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.Schema
import models.search.{SearchDocument, SearchResults}

import scala.collection.mutable

class MemStore extends AbstractStore {
  private val sdfDocumentsById = new mutable.HashMap[Uri, SdfDocument]
  private val searchEngine = new SearchEngine

  final override def deleteSdfDocumentById(id: Uri): Unit = {
    val removedSdfDocument = sdfDocumentsById.remove(id)
    if (!removedSdfDocument.isDefined) {
      return
    }
    // Just clear and repopulate the index rather than trying to delete parts of it.
    searchEngine.deleteAll()
    sdfDocumentsById.values.foreach(searchEngine.putSdfDocument(_))
  }

  final override def deleteSdfDocuments(): Unit = {
    sdfDocumentsById.clear()
    searchEngine.deleteAll()
  }

  final override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    sdfDocumentsById.get(id)

  final override def getSdfDocuments: List[SdfDocument] =
    sdfDocumentsById.values.toList

  final override def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    deleteSdfDocumentById(sdfDocument.id)  // Clear out any old schemas
    putSdfDocumentImpl(sdfDocument)
  }

  private def putSdfDocumentImpl(sdfDocument: SdfDocument): Unit = {
    sdfDocumentsById.update(sdfDocument.id, sdfDocument)
    searchEngine.putSdfDocument(sdfDocument)
  }

  final override def putSdfDocuments(sdfDocuments: List[SdfDocument]): Unit =
    sdfDocuments.foreach(putSdfDocument(_))

  final override def search(limit: Int, offset: Int, query: String): SearchResults =
    searchEngine.search(limit, offset, query)
}
