class ValidationMessagesByType {
  constructor(private readonly type: string) {}

  validationMessage(index: number) {
    return cy.get(
      `[data-cy=${this.type.toLowerCase()}-validation-message-${index}]`
    );
  }
}

export class SdfDocumentEditor {
  readonly selector = "[data-cy=sdf-document-editor]";

  get textarea() {
    return cy.get(`${this.selector} #ace-editor textarea`);
  }

  get validateButton() {
    return cy.get(`${this.selector} [data-cy=validate-button]`);
  }

  get validationMessages() {
    const validationMessagesSelector = `${this.selector} [data-cy=validation-messages]`;
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
  }
}
