import {SchemasTable} from "./SchemasTable";

export class SdfDocumentCard {
  constructor(private readonly selector: string) {}

  get schemasHeader() {
    return cy.get(this.selector + " [data-cy=sdf-document-schemas-header]");
  }

  get schemasTable() {
    return new SchemasTable(this.selector + " [data-cy=schemas-table]");
  }

  get sdfDocumentId() {
    return cy.get(this.selector + " [data-cy=sdf-document-id]");
  }

  get sdfDocumentName() {
    return cy.get(this.selector + " [data-cy=sdf-document-name]");
  }
}
