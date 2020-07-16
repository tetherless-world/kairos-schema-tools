class SchemasTableRow {
  constructor(private readonly selector: string) {}

  get id() {
    return cy.get(this.selector + " [data-cy=schema-id]");
  }

  get name() {
    return cy.get(this.selector + " [data-cy=schema-name]");
  }
}

export class SchemasTable {
  constructor(private readonly selector: string) {}

  schema(id: string) {
    return new SchemasTableRow(this.selector + ` [data-cy="schema-${id}"]`);
  }
}
