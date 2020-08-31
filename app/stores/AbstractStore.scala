package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema.{Primitive, PrimitiveSlot, Schema, SchemaSlot, Step, StepParticipant}
import models.sdfDocument.SdfDocument

abstract class AbstractStore extends Store {
  override def getPrimitiveById(id: Uri): Option[Primitive] =
    getPrimitives.find(_.id == id)

  override def getPrimitives: List[Primitive] =
    getSdfDocuments.flatMap(_.primitives)

  override def getPrimitiveSlotById(id: Uri): Option[PrimitiveSlot] = {
    getPrimitives.view.flatMap(primitive => primitive.slots.find(_.id == id)).headOption
  }

  override def getSchemaById(id: Uri): Option[Schema] =
    getSchemas.find(_.id == id)

  override def getSchemas: List[Schema] =
    getSdfDocuments.flatMap(_.schemas)

  override def getSchemaSlotById(id: Uri): Option[SchemaSlot] =
    getSchemas.view.flatMap(schema => schema.slots.find(_.id == id)).headOption

  override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    getSdfDocuments.find(_.id == id)

  override def getStepById(id: Uri): Option[Step] = {
    getSchemas.view.flatMap(schema => schema.steps.find(_.id == id)).headOption
  }

  override def getStepParticipantById(id: Uri): Option[StepParticipant] =
    getSchemas.view.flatMap(schema => schema.steps.flatMap(step => step.participants.flatMap(participants => participants.find(_.id == id)))).headOption
}
