const encodeId = (kwds: {id: string; idEncoded?: boolean}) =>
  kwds.idEncoded ? kwds.id : encodeURIComponent(kwds.id);

class SubHrefs {
  constructor(readonly home: string) {}

  toString() {
    return this.home;
  }
}

class SchemaHrefs extends SubHrefs {
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

  get stepOrder() {
    return `${this.home}#${this.STEP_ORDER_ID}`;
  }

  get steps() {
    return `${this.home}#${this.STEPS_ID}`;
  }
}

class SchemasHrefs extends SubHrefs {
  schema(kwds: {id: string; idEncoded?: boolean}) {
    return new SchemaHrefs(this.home + encodeId(kwds));
  }
}

class SdfDocumentHrefs extends SubHrefs {
  get schemas() {
    return new SchemasHrefs(this.home + "schema/");
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
  static readonly schemas = new SchemasHrefs("/schema/");
  static readonly sdfDocuments = new SdfDocumentsHrefs("/sdfdocument/");
}
