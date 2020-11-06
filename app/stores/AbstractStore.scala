package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema.{Entity, Primitive, PrimitiveSlot, ProvenanceDataObject, Schema, SchemaSlot, Step, StepParticipant}
import models.sdfDocument.SdfDocument

abstract class AbstractStore extends Store {
  override def getEntities: List[Entity] =
    getSchemas.view.flatMap(_.entities.getOrElse(List())).toList

  override def getEntityById(id: Uri): Option[Entity] =
    getEntities.find(_.id == id)

  override def getPrimitiveById(id: Uri): Option[Primitive] =
    getPrimitives.find(_.id == id)

  override def getPrimitives: List[Primitive] =
    getSdfDocuments.flatMap(_.primitives)

  override def getPrimitiveSlotById(id: Uri): Option[PrimitiveSlot] =
    getPrimitives.view.flatMap(_.slots.find(_.id == id)).headOption

  override def getProvenanceDataObjectById(id: String): Option[ProvenanceDataObject] =
    getSchemas.view.flatMap(_.provenanceData.flatMap(_.find(_.id == id))).headOption

  override def getSchemaById(id: Uri): Option[Schema] =
    getSchemas.find(_.id == id)

  override def getSchemas: List[Schema] =
    getSdfDocuments.flatMap(_.schemas)

  override def getSchemaSlotById(id: Uri): Option[SchemaSlot] =
    getSchemas.view.flatMap(_.slots.find(_.id == id)).headOption

  override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    getSdfDocuments.find(_.id == id)

  override def getStepById(id: Uri): Option[Step] =
    getSchemas.view.flatMap(_.steps.list.find(_.id == id)).headOption

  override def getStepParticipantById(id: Uri): Option[StepParticipant] =
    getSchemas.view.flatMap(_.steps.list.flatMap(_.participants.flatMap(_.find(_.id == id)))).headOption
}
