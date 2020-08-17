package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class SdfDocumentPath

final case class SdfDocumentPathStep(id: Uri)

final case class SdfDocumentPathSchema(id: Uri)

final case class SdfDocumentPathSdfDocument(id: Uri, primitive: Option[SdfDocumentPathPrimitive], schema: Option[SdfDocumentPathSchema])

final case class SdfDocumentPath(
                                  sdfDocument: Uri,
                                  primitiveId: Option[Uri] = None,
                                  primitiveSlotId: Option[Uri] = None,
                                  stepId: Option[Uri] = None,
                                  stepParticipantId: Option[Uri] = None,
                                  schemaId: Option[Uri] = None,
                                  schemaSlotId: Option[Uri] = None,
                                ) {
  if (primitiveSlotId.isDefined && !primitiveId.isDefined) {
    throw new IllegalArgumentException("primitive id must be defined if the primitive slot id is defined")
  }
  if (schemaSlotId.isDefined && !schemaId.isDefined) {
    throw new IllegalArgumentException("schema id must be defined if the schema slot id is defined")
  }
  if (stepId.isDefined && !schemaId.isDefined) {
    throw new IllegalArgumentException("schema id must be defined if the step id is defined")
  }
  if (stepParticipantId.isDefined && !stepId.isDefined) {
    throw new IllegalArgumentException("step id must be defined if the step participant id is defined")
  }
}
