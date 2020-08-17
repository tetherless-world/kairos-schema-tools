import * as qs from "qs";
import {SdfDocumentSourcePath} from "models/sdfDocument/SdfDocumentSourcePath";
import {SchemaSectionId} from "models/schema/SchemaSectionId";

const encodeId = (kwds: {id: string; idEncoded?: boolean}) =>
  kwds.idEncoded ? kwds.id : encodeURIComponent(kwds.id);

class SubHrefs {
  constructor(readonly home: string) {}

  toString() {
    return this.home;
  }
}

export class SchemaHrefs extends SubHrefs {
  slot(slot: {id: string}) {
    return `${this.home}#${this.slotId(slot)}`;
  }

  slotId(slot: {id: string}) {
    return `slot-${this.sanitizeId(slot.id)}`;
  }

  private sanitizeId(id: string) {
    return id.replace(/[^a-z]/gi, "");
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

class SdfDocumentSchemasHrefs extends SubHrefs {
  schema(kwds: {id: string; idEncoded?: boolean}) {
    return new SchemaHrefs(this.home + encodeId(kwds));
  }
}

class SdfDocumentHrefs extends SubHrefs {
  get schemas() {
    return new SdfDocumentSchemasHrefs(this.home + "schema/");
  }

  sourcePath(path: Omit<SdfDocumentSourcePath, "sdfDocumentId">) {
    // Copy out only the properties we want
    const pathCopy: Omit<SdfDocumentSourcePath, "sdfDocumentId"> = {
      schemaId: path.schemaId,
      slotId: path.slotId,
      stepId: path.stepId,
      stepParticipantId: path.stepParticipantId,
    };
    return this.home + qs.stringify(pathCopy, {addQueryPrefix: true});
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

  static search(kwds?: {query: string}) {
    return Hrefs.home + "search" + qs.stringify(kwds, {addQueryPrefix: true});
  }
}
