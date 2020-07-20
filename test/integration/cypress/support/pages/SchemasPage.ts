import {Page} from "./Page";
import {SchemasTable} from "./SchemasTable";

export class SchemasPage extends Page {
  constructor(kwds?: {sdfDocumentId?: string}) {
    super();
    const relativeUrlSuffix = `/schema/`;
    this.sdfDocumentId = kwds ? kwds.sdfDocumentId : undefined;
    this.relativeUrl = this.sdfDocumentId
      ? `/sdfdocument/${encodeURIComponent(this.sdfDocumentId)}` +
        relativeUrlSuffix
      : relativeUrlSuffix;
  }

  get schemasTable() {
    return new SchemasTable("[data-cy=schemas-table]");
  }

  get sdfDocumentName() {
    return cy.get("[data-cy=sdf-document-name]");
  }

  readonly relativeUrl: string;
  readonly sdfDocumentId?: string;
}
