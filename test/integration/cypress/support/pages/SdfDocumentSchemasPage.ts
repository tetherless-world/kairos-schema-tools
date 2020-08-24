import {Page} from "./Page";
import {SchemasTable} from "./SchemasTable";

export class SdfDocumentSchemasPage extends Page {
  constructor(kwds: {sdfDocumentId: string}) {
    super();
    this.sdfDocumentId = kwds.sdfDocumentId;
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(
      this.sdfDocumentId
    )}/schema/`;
  }

  get schemasTable() {
    return new SchemasTable("[data-cy=schemas-table]");
  }

  get sdfDocumentName() {
    return cy.get("[data-cy=sdf-document-name]");
  }

  readonly relativeUrl: string;
  readonly sdfDocumentId: string;
}
