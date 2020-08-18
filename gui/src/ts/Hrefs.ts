import * as qs from "qs";
import {SchemaSectionId} from "models/schema/SchemaSectionId";
import {SdfDocumentPath} from "models/sdfDocument/SdfDocumentPath";
import {SdfDocument} from "../../../test/integration/cypress/support/models/SdfDocument";

const encodeId = (kwds: {id: string; idEncoded?: boolean}) =>
  kwds.idEncoded ? kwds.id : encodeURIComponent(kwds.id);

class SubHrefs {
  constructor(readonly home: string) {}

  protected sanitizeId(id: string) {
    return id.replace(/[^a-z]/gi, "");
  }

  toString() {
    return this.home;
  }
}

export class PrimitiveHrefs extends SubHrefs {
  slot(slot: {id: string}) {
    return `${this.home}#${this.slotId(slot)}`;
  }

  slotId(slot: {id: string}) {
    return `slot-${this.sanitizeId(slot.id)}`;
  }
}

export class SchemaHrefs extends SubHrefs {
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
    return new SdfDocumentPrimitivesHrefs(this.home + "primitives/");
  }

  get schemas() {
    return new SdfDocumentSchemasHrefs(this.home + "schema/");
  }

  sourcePath(path: Omit<SdfDocumentPath, "id">) {
    return (
      this.home +
      qs.stringify({path: JSON.stringify(path)}, {addQueryPrefix: true})
    );
  }
}

class SdfDocumentsHrefs extends SubHrefs {
  sdfDocument(kwds: {id: string; idEncoded?: boolean}) {
    return new SdfDocumentHrefs(this.home + encodeId(kwds) + "/");
  }
}

export class Hrefs {
  static readonly contact = "mailto:gordom6@rpi.edu";
  static readonly gitHub = "https://github.com/tetherless-world/mcs-portal";
  static readonly home = "/";
  static readonly schemas = "/schema/";
  static readonly sdfDocuments = new SdfDocumentsHrefs("/sdfdocument/");

  static sdfDocumentPath(path: SdfDocumentPath) {
    const sdfDocumentHrefs = Hrefs.sdfDocuments.sdfDocument({id: path.id});
    if (path.primitive) {
      const primitiveHrefs = sdfDocumentHrefs.primitives.primitive({
        id: path.primitive.id,
      });
      if (path.primitive.slot) {
        return primitiveHrefs.slot({id: path.primitive.slot.id});
      } else {
        return primitiveHrefs.toString();
      }
    } else if (path.schema) {
      const schemaHrefs = sdfDocumentHrefs.schemas.schema({id: path.schema.id});
      if (path.schema.slot) {
        return schemaHrefs.slot({id: path.schema.slot.id});
      } else if (path.schema.step) {
        if (path.schema.step.participant) {
          return schemaHrefs.stepParticipant({
            id: path.schema.step.participant.id,
          });
        } else {
          return schemaHrefs.step({id: path.schema.step.id});
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
