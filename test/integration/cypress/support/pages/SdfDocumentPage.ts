import {Page} from "./Page";
import {SdfDocumentCard} from "./SdfDocumentCard";

export class SdfDocumentPage extends Page {
  constructor(readonly id: string) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(id)}/`;
  }

  get sourceTab() {
    cy.get("[data-cy=source-tab]").click();
    return {};
  }

  get tableTab() {
    cy.get("[data-cy=table-tab]").click();
    const sdfDocumentId = this.id;
    return {
      get card(): SdfDocumentCard {
        return new SdfDocumentCard(
          `[data-cy="sdf-document-card-${sdfDocumentId}"]`
        );
      },
    };
  }

  readonly relativeUrl: string;
}
