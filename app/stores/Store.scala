package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.{Primitive, Schema}
import models.search.{SearchDocument, SearchResults}

trait Store {
  def deleteSdfDocumentById(id: Uri): Unit
  def deleteSdfDocuments(): Unit

  def getPrimitiveById(id: Uri): Option[Primitive]
  def getPrimitives: List[Primitive]

  def getSchemaById(id: Uri): Option[Schema]
  def getSchemas: List[Schema]

  def getSdfDocumentById(id: Uri): Option[SdfDocument]
  def getSdfDocuments: List[SdfDocument]

  def putSdfDocument(sdfDocument: SdfDocument)

  def putSdfDocuments(sdfDocuments: List[SdfDocument])

  def search(limit: Int, offset: Int, query: String): SearchResults
}
