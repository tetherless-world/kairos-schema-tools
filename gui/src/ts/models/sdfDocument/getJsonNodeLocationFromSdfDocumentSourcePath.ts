import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
import {SdfDocumentSourcePath} from "models/sdfDocument/SdfDocumentSourcePath";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";

export const getJsonNodeLocationFromSdfDocumentSourcePath = (
  sdfDocument: SdfDocumentSourceFragment,
  sdfDocumentSourcePath: SdfDocumentSourcePath
): JsonNodeLocationFragment | undefined => {
  if (!sdfDocumentSourcePath.schemaId) {
    return undefined;
  }
  const schema = sdfDocument.schemas.find(
    (schema) => schema.id === sdfDocumentSourcePath.schemaId
  );
  if (!schema) {
    return undefined;
  }
  let result = schema.sourceJsonNodeLocation;
  if (sdfDocumentSourcePath.slotId) {
    const slot = schema.slots.find(
      (slot) => slot.id === sdfDocumentSourcePath.slotId
    );
    if (slot) {
      result = slot.sourceJsonNodeLocation;
    }
  } else if (sdfDocumentSourcePath.stepId) {
    const step = schema.steps.find(
      (step) => step.id === sdfDocumentSourcePath.stepId
    );
    if (!step) {
      return result;
    }
    result = step.sourceJsonNodeLocation;
    if (sdfDocumentSourcePath.stepParticipantId) {
      const stepParticipant = step.participants?.find(
        (participant) =>
          participant.id === sdfDocumentSourcePath.stepParticipantId
      );
      if (stepParticipant) {
        result = stepParticipant.sourceJsonNodeLocation;
      }
    }
  }
  return result;
};
