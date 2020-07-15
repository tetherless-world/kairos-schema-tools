class Schema {
  constructor(private readonly selector: string) {}

  get id() {
    return cy.get(this.selector + " [data-cy=schema-id]");
  }

  get name() {
    return cy.get(this.selector + " [data-cy=schema-name]");
  }
}

class Schemas {
  constructor(private readonly selector: string) {}

  get header() {
    return cy.get(this.selector + " [data-cy=sdf-document-schemas-header]");
  }

  schema(id: string) {
    return new Schema(this.selector + ` [data-cy="schema-${id}"]`);
  }
}

export class SdfDocumentCard {
  constructor(private readonly selector: string) {}

  get schemas() {
    return new Schemas(this.selector + " [data-cy=sdf-document-schemas]");
  }

  get sdfDocumentId() {
    return cy.get(this.selector + " [data-cy=sdf-document-id]");
  }

  get sdfDocumentName() {
    return cy.get(this.selector + " [data-cy=sdf-document-name]");
  }
}
