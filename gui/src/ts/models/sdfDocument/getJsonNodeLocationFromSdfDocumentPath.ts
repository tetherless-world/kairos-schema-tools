import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";
import {SdfDocumentPath} from "models/sdfDocument/SdfDocumentPath";

export const getJsonNodeLocationFromSdfDocumentPath = (
  sdfDocument: SdfDocumentSourceFragment,
  sdfDocumentPath: SdfDocumentPath
): JsonNodeLocationFragment | undefined => {
  let result: JsonNodeLocationFragment | undefined;

  if (sdfDocumentPath.primitive) {
    const primitive = sdfDocument.primitives.find(
      (primitive) => primitive.id === sdfDocumentPath.primitive!.id
    );
    if (primitive) {
      result = primitive.sourceJsonNodeLocation;

      if (sdfDocumentPath.primitive!.slot) {
        const slot = primitive.slots.find(
          (slot) => slot.id === sdfDocumentPath.primitive!.slot!.id
        );
        if (slot) {
          result = slot.sourceJsonNodeLocation;
        }
      }
    }
  } else if (sdfDocumentPath.schema) {
    const schema = sdfDocument.schemas.find(
      (schema) => schema.id === sdfDocumentPath.schema!.id
    );
    if (schema) {
      result = schema.sourceJsonNodeLocation;

      if (sdfDocumentPath.schema!.slot) {
        const slot = schema.slots.find(
          (slot) => slot.id === sdfDocumentPath.schema!.slot!.id
        );
        if (slot) {
          result = slot.sourceJsonNodeLocation;
        }
      } else if (sdfDocumentPath.schema!.step) {
        const step = schema.steps.find(
          (step) => step.id === sdfDocumentPath.schema!.step!.id
        );
        if (step) {
          result = step.sourceJsonNodeLocation;

          if (sdfDocumentPath.schema!.step!.participant) {
            const stepParticipant = step.participants?.find(
              (participant) =>
                participant.id === sdfDocumentPath.schema!.step!.participant!.id
            );
            if (stepParticipant) {
              result = stepParticipant.sourceJsonNodeLocation;
            }
          }
        }
      }
    }
  }

  return result;
};
