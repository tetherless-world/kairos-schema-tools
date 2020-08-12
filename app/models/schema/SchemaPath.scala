package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class SchemaPath(
                             sdfDocumentId: Uri,
                             slotId: Option[Uri] = None,
                             stepId: Option[Uri] = None,
                             stepParticipantId: Option[Uri] = None,
                             schemaId: Option[Uri] = None
                           ) {
  if (slotId.isDefined && !schemaId.isDefined) {
    throw new IllegalArgumentException("schema id must be defined if the slot id is defined")
  }
  if (stepId.isDefined && !schemaId.isDefined) {
    throw new IllegalArgumentException("schema id must be defined if the step id is defined")
  }
  if (stepParticipantId.isDefined && !stepId.isDefined) {
    throw new IllegalArgumentException("step id must be defined if the step participant id is defined")
  }
}
