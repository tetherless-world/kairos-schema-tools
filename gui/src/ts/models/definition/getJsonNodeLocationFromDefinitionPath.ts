import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";
import {DefinitionPath} from "models/definition/DefinitionPath";

export const getJsonNodeLocationFromDefinitionPath = (
  path: DefinitionPath,
  sdfDocument: SdfDocumentSourceFragment
): JsonNodeLocationFragment | undefined => {
  let result: JsonNodeLocationFragment | undefined;

  if (path.sdfDocument.primitive) {
    const primitive = sdfDocument.primitives.find(
      (primitive) => primitive.id === path.sdfDocument.primitive!.id
    );
    if (primitive) {
      result = primitive.sourceJsonNodeLocation;

      if (path.sdfDocument.primitive!.slot) {
        const slot = primitive.slots.find(
          (slot) => slot.id === path.sdfDocument.primitive!.slot!.id
        );
        if (slot) {
          result = slot.sourceJsonNodeLocation;
        }
      }
    }
  } else if (path.sdfDocument.schema) {
    const schema = sdfDocument.schemas.find(
      (schema) => schema.id === path.sdfDocument.schema!.id
    );
    if (schema) {
      result = schema.sourceJsonNodeLocation;

      if (path.sdfDocument.schema!.entity) {
        const entity = schema.entities?.find(
          (entity) => entity.id === path.sdfDocument.schema!.entity!.id
        );
        if (entity) {
          result = entity.sourceJsonNodeLocation;
        }
      } else if (path.sdfDocument.schema!.provenanceDataObject) {
        const provenanceDataObject = schema.provenanceData?.find(
          (provenanceDataObject) =>
            provenanceDataObject.id ===
            path.sdfDocument.schema!.provenanceDataObject!.id
        );
        if (provenanceDataObject) {
          result = provenanceDataObject.sourceJsonNodeLocation;
        }
      } else if (path.sdfDocument.schema!.slot) {
        const slot = schema.slots.find(
          (slot) => slot.id === path.sdfDocument.schema!.slot!.id
        );
        if (slot) {
          result = slot.sourceJsonNodeLocation;
        }
      } else if (path.sdfDocument.schema!.step) {
        const step = schema.steps.list.find(
          (step) => step.id === path.sdfDocument.schema!.step!.id
        );
        if (step) {
          result = step.sourceJsonNodeLocation;

          if (path.sdfDocument.schema!.step!.participant) {
            const stepParticipant = step.participants?.find(
              (participant) =>
                participant.id ===
                path.sdfDocument.schema!.step!.participant!.id
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
