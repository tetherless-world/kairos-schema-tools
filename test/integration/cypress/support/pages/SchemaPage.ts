import {Page} from "./Page";

export class SchemaPage extends Page {
  constructor(kwds: {schemaId: string; sdfDocumentId: string}) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(
      kwds.sdfDocumentId
    )}/schema/${encodeURIComponent(kwds.schemaId)}`;
    this.schemaId = kwds.schemaId;
    this.sdfDocumentId = kwds.sdfDocumentId;
  }

  get graphTab() {
    cy.get("[data-cy=graph-tab]").click();
    return {
      get graph() {
        return cy.get("#schema-graph");
      },
    };
  }

  get tableTab() {
    cy.get("[data-cy=table-tab]").click();
    return {};
  }

  readonly relativeUrl: string;
  readonly schemaId: string;
  readonly sdfDocumentId?: string;
}
