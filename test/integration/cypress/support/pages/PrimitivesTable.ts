class PrimitivesTableRow {
  constructor(private readonly selector: string) {}

  get id() {
    return cy.get(this.selector + " [data-cy=primitive-id]");
  }

  get name() {
    return cy.get(this.selector + " [data-cy=primitive-name]");
  }
}

export class PrimitivesTable {
  constructor(private readonly selector: string) {}

  primitive(id: string) {
    return new PrimitivesTableRow(
      this.selector + ` [data-cy="primitive-${id}"]`
    );
  }
}
