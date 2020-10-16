import {Page} from "./Page";
import {SdfDocumentEditor} from "./SdfDocumentEditor";

class ValidationMessagesByType {
  constructor(private readonly type: string) {}

  validationMessage(index: number) {
    return cy.get(
      `[data-cy=${this.type.toLowerCase()}-validation-message-${index}]`
    );
  }
}

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

  get validationTab() {
    cy.get("[data-cy=source-tab]").click();
    return {
      get validationMessages() {
        const validationMessagesSelector = `[data-cy=validation-messages]`;
        return {
          error: new ValidationMessagesByType("error"),
          fatal: new ValidationMessagesByType("fatal"),
          get noValidationMessages() {
            return cy.get(
              `${validationMessagesSelector} [data-cy=no-validation-messages]`
            );
          },
          warning: new ValidationMessagesByType("error"),
        };
      },
    };
  }

  readonly relativeUrl: string;
}
