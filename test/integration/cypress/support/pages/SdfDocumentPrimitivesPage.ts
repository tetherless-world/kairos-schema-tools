import {Page} from "./Page";
import {PrimitivesTable} from "./PrimitivesTable";

export class SdfDocumentPrimitivesPage extends Page {
  constructor(kwds: {sdfDocumentId: string}) {
    super();
    this.sdfDocumentId = kwds.sdfDocumentId;
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(
      this.sdfDocumentId
    )}/primitive/`;
  }

  get primitivesTable() {
    return new PrimitivesTable("[data-cy=primitives-table]");
  }

  get sdfDocumentName() {
    return cy.get("[data-cy=sdf-document-name]");
  }

  readonly relativeUrl: string;
  readonly sdfDocumentId: string;
}
