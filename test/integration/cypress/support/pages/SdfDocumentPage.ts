import {Page} from "./Page";
import {SdfDocumentEditor} from "./SdfDocumentEditor";

export class SdfDocumentPage extends Page {
  constructor(readonly id: string) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(id)}/`;
  }

  get annotatorReadableFormTab() {
    cy.get("[data-cy=annotator-readable-form-tab]").click();
    return {
      get annotatorReadableForm() {
        return cy.get("[data-cy=annotator-readable-form]");
      },
      get noAnnotatorReadableForm() {
        return cy.get("[data-cy=no-annotator-readable-form");
      },
      get refreshButton() {
        return cy.get("[data-cy=refresh-button]");
      },
    };
  }

  get sourceTab() {
    cy.get("[data-cy=source-tab]").click();
    return {
      editor: new SdfDocumentEditor(),
    };
  }

  readonly relativeUrl: string;
}
