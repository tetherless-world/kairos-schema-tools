import * as qs from "qs";

const encodeId = (kwds: {id: string; idEncoded?: boolean}) =>
  kwds.idEncoded ? kwds.id : encodeURIComponent(kwds.id);

class SubHrefs {
  constructor(readonly home: string) {}

  toString() {
    return this.home;
  }
}

export class SchemaHrefs extends SubHrefs {
  readonly DETAILS_ID = "details";
  readonly ENTITY_RELATIONS_ID = "entity-relations";
  readonly SLOTS_ID = "slots";
  readonly STEPS_ID = "steps";
  readonly STEP_ORDER_ID = "step-order";

  get details() {
    return `${this.home}#${this.DETAILS_ID}`;
  }

  get entityRelations() {
    return `${this.home}#${this.ENTITY_RELATIONS_ID}`;
  }

  get slots() {
    return `${this.home}#${this.SLOTS_ID}`;
  }

  slot(slot: {id: string}) {
    return `${this.home}#${this.slotId(slot)}`;
  }

  slotId(slot: {id: string}) {
    return `slot-${this.sanitizeId(slot.id)}`;
  }

  private sanitizeId(id: string) {
    return id.replace(/[^a-z]/gi, "");
  }

  step(step: {id: string}) {
    return `${this.home}#${this.stepId(step)}`;
  }

  stepId(step: {id: string}) {
    return `step-${this.sanitizeId(step.id)}`;
  }

  get stepOrder() {
    return `${this.home}#${this.STEP_ORDER_ID}`;
  }

  get steps() {
    return `${this.home}#${this.STEPS_ID}`;
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
