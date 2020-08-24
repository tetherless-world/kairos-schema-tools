import {Page} from "./Page";
import {PrimitivesTable} from "./PrimitivesTable";

export class PrimitivesPage extends Page {
  constructor(kwds?: {sdfDocumentId?: string}) {
    super();
    const relativeUrlSuffix = `/primitive/`;
    this.sdfDocumentId = kwds ? kwds.sdfDocumentId : undefined;
    this.relativeUrl = this.sdfDocumentId
      ? `/sdfdocument/${encodeURIComponent(this.sdfDocumentId)}` +
        relativeUrlSuffix
      : relativeUrlSuffix;
  }

  get primitivesTable() {
    return new PrimitivesTable("[data-cy=primitives-table]");
  }

  get sdfDocumentName() {
    return cy.get("[data-cy=sdf-document-name]");
  }

  readonly relativeUrl: string;
  readonly sdfDocumentId?: string;
}
