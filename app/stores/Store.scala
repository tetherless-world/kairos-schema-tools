package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema._
import models.sdfDocument.SdfDocument
import models.search.SearchResults

trait Store {
  def getEntities: List[Entity]
  def getEntityById(id: Uri): Option[Entity]

  def deleteSdfDocumentById(id: Uri): Unit
  def deleteSdfDocuments(): Unit

  def getPrimitiveById(id: Uri): Option[Primitive]
  def getPrimitives: List[Primitive]
  def getPrimitiveSlotById(id: Uri): Option[PrimitiveSlot]

  def getProvenanceDataObjectById(id: String): Option[ProvenanceDataObject]

  def getSchemaById(id: Uri): Option[Schema]
  def getSchemas: List[Schema]
  def getSchemaSlotById(id: Uri): Option[SchemaSlot]

  def getSdfDocumentById(id: Uri): Option[SdfDocument]
  def getSdfDocuments: List[SdfDocument]

  def getStepById(id: Uri): Option[Step]
  def getParticipantById(id: Uri): Option[Participant]

  def putSdfDocument(sdfDocument: SdfDocument)

  def putSdfDocuments(sdfDocuments: List[SdfDocument])

  def search(limit: Int, offset: Int, query: String): SearchResults
}
