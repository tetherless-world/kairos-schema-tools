package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.Schema
import models.search.{SearchDocument, SearchResults}

import scala.collection.mutable

class MemStore extends Store {
  private val schemasById = new mutable.HashMap[Uri, Schema]
  private val sdfDocumentsById = new mutable.HashMap[Uri, SdfDocument]
  private val searchEngine = new SearchEngine

  final override def getSchemaById(id: Uri): Option[Schema] =
    schemasById.get(id)

  final override def getSchemas: List[Schema] =
    schemasById.values.toList

  final override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    sdfDocumentsById.get(id)

  final override def getSdfDocuments: List[SdfDocument] =
    sdfDocumentsById.values.toList

  private def putSchema(schema: Schema): Unit =
    schemasById.update(schema.id, schema)

  private def putSchemas(schemas: List[Schema]): Unit =
    schemas.foreach(putSchema(_))

  final override def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    sdfDocumentsById.update(sdfDocument.id, sdfDocument)
    putSchemas(sdfDocument.schemas)
    searchEngine.putSdfDocument(sdfDocument)
  }

  final override def putSdfDocuments(sdfDocuments: List[SdfDocument]): Unit =
    sdfDocuments.foreach(putSdfDocument(_))

  final override def search(limit: Int, offset: Int, query: String): SearchResults =
    searchEngine.search(limit, offset, query)
}
