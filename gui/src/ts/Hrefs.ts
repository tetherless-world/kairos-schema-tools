import * as qs from "qs";
import {SchemaSectionId} from "models/schema/SchemaSectionId";
import {PrimitiveSectionId} from "models/primitive/PrimitiveSectionId";
import * as _ from "lodash";
import {DefinitionPath} from "models/definition/DefinitionPath";

const encodeId = (kwds: {id: string; idEncoded?: boolean}) =>
  kwds.idEncoded ? kwds.id : encodeURIComponent(kwds.id);

class SubHrefs {
  constructor(readonly home: string) {}

  protected sanitizeId(id: string) {
    return id.replace(/[^a-z0-9]/gi, "");
  }

  toString() {
    return this.home;
  }
}

export class PrimitiveHrefs extends SubHrefs {
  section(id: PrimitiveSectionId) {
    return `${this.home}#${id}`;
  }

  slot(slot: {id: string}) {
    return `${this.home}#${this.slotId(slot)}`;
  }

  slotId(slot: {id: string}) {
    return `slot-${this.sanitizeId(slot.id)}`;
  }
}

export class SchemaHrefs extends SubHrefs {
  provenanceDataObject(provenanceDataObject: {id: string}) {
    return `${this.home}#${this.provenanceDataObjectId(provenanceDataObject)}`;
  }

  provenanceDataObjectId(provenanceDataObject: {id: string}) {
    return `provenance-data-object-${this.sanitizeId(provenanceDataObject.id)}`;
  }

  slot(slot: {id: string}) {
    return `${this.home}#${this.slotId(slot)}`;
  }

  slotId(slot: {id: string}) {
    return `slot-${this.sanitizeId(slot.id)}`;
  }

  section(id: SchemaSectionId) {
    return `${this.home}#${id}`;
  }

  step(step: {id: string}) {
    return `${this.home}#${this.stepId(step)}`;
  }

  stepId(step: {id: string}) {
    return `step-${this.sanitizeId(step.id)}`;
  }

  stepParticipant(stepParticipant: {id: string}) {
    return `${this.home}#${this.stepParticipantId(stepParticipant)}`;
  }

  stepParticipantId(stepParticipant: {id: string}) {
    return `step-participant-${this.sanitizeId(stepParticipant.id)}`;
  }
}

class SdfDocumentPrimitivesHrefs extends SubHrefs {
  primitive(kwds: {id: string; idEncoded?: boolean}) {
    return new PrimitiveHrefs(this.home + encodeId(kwds));
  }
}

class SdfDocumentSchemasHrefs extends SubHrefs {
  schema(kwds: {id: string; idEncoded?: boolean}) {
    return new SchemaHrefs(this.home + encodeId(kwds));
  }
}

class SdfDocumentHrefs extends SubHrefs {
  get primitives() {
    return new SdfDocumentPrimitivesHrefs(this.home + "primitive/");
  }

  get schemas() {
    return new SdfDocumentSchemasHrefs(this.home + "schema/");
  }

  sourcePath(path: DefinitionPath) {
    const removeTypenames = (object: any) => {
      const newObject: any = {};
      for (const key of Object.keys(object)) {
        newObject[key] =
          _.isObject(object[key]) && object["__typename"]
            ? removeTypenames(object[key])
            : object[key];
      }
      return newObject;
    };

    return (
      this.home +
      qs.stringify(
        {path: JSON.stringify(removeTypenames(path))},
        {addQueryPrefix: true}
      )
    );
  }
}

class SdfDocumentsHrefs extends SubHrefs {
  sdfDocument(kwds: {id: string; idEncoded?: boolean}) {
    return new SdfDocumentHrefs(this.home + encodeId(kwds) + "/");
  }
}

export class Hrefs {
  static readonly home = "/";
  static readonly primitives = "/primitive/";
  static readonly schemas = "/schema/";
  static readonly sdfDocuments = new SdfDocumentsHrefs("/sdfdocument/");

  static definitionPath(path: DefinitionPath) {
    const sdfDocumentHrefs = Hrefs.sdfDocuments.sdfDocument({
      id: path.sdfDocument.id,
    });
    if (path.sdfDocument.primitive) {
      const primitiveHrefs = sdfDocumentHrefs.primitives.primitive({
        id: path.sdfDocument.primitive.id,
      });
      if (path.sdfDocument.primitive.slot) {
        return primitiveHrefs.slot({id: path.sdfDocument.primitive.slot.id});
      } else {
        return primitiveHrefs.toString();
      }
    } else if (path.sdfDocument.schema) {
      const schemaHrefs = sdfDocumentHrefs.schemas.schema({
        id: path.sdfDocument.schema.id,
      });
      if (path.sdfDocument.schema.provenanceDataObject) {
        return schemaHrefs.provenanceDataObject({
          id: path.sdfDocument.schema.provenanceDataObject.id,
        });
      } else if (path.sdfDocument.schema.slot) {
        return schemaHrefs.slot({id: path.sdfDocument.schema.slot.id});
      } else if (path.sdfDocument.schema.step) {
        if (path.sdfDocument.schema.step.participant) {
          return schemaHrefs.stepParticipant({
            id: path.sdfDocument.schema.step.participant.id,
          });
        } else {
          return schemaHrefs.step({id: path.sdfDocument.schema.step.id});
        }
      } else {
        return schemaHrefs.toString();
      }
    } else {
      return sdfDocumentHrefs.toString();
    }
  }

  static search(kwds?: {query: string}) {
    return Hrefs.home + "search" + qs.stringify(kwds, {addQueryPrefix: true});
  }
}
