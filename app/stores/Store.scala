package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.Schema

trait Store {
  def getSchemaById(id: Uri): Option[Schema]
  def getSchemas: List[Schema]

  def getSdfDocumentById(id: Uri): Option[SdfDocument]
  def getSdfDocuments: List[SdfDocument]

  def putSchema(schema: Schema)
  def putSchemas(schemas: List[Schema])

  def putSdfDocument(sdfDocument: SdfDocument)
  def putSdfDocuments(sdfDocuments: List[SdfDocument])
}
