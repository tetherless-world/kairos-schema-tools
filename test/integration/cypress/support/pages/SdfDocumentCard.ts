class SchemasTableRow {
  constructor(private readonly selector: string) {}

  get schemaId() {
    return cy.get(this.selector + " [data-cy=schema-id]");
  }

  get schemaName() {
    return cy.get(this.selector + " [data-cy=schema-name]");
  }
}

export class SdfDocumentCard {
  constructor(private readonly selector: string) {}

  schema(id: string) {
    return new SchemasTableRow(
      this.selector + ` [data-cy=sdf-document-schemas] [data-cy="schema-${id}"]`
    );
  }

  get sdfDocumentName() {
    return cy.get(this.selector + " [data-cy=sdf-document-name]");
  }
}
