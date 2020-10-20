package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema.{Primitive, PrimitiveSlot, ProvenanceDataObject, Schema, SchemaSlot, Step, StepParticipant}
import models.sdfDocument.SdfDocument
import models.search.{SearchDocument, SearchResults}

trait Store {
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
  def getStepParticipantById(id: Uri): Option[StepParticipant]

  def putSdfDocument(sdfDocument: SdfDocument)

  def putSdfDocuments(sdfDocuments: List[SdfDocument])

  def search(limit: Int, offset: Int, query: String): SearchResults
}
