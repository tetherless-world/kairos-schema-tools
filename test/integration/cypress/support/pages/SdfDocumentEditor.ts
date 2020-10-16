export class SdfDocumentEditor {
  readonly selector = "[data-cy=sdf-document-editor]";

  get textarea() {
    return cy.get(`${this.selector} #ace-editor textarea`);
  }

  get validateButton() {
    return cy.get(`${this.selector} [data-cy=validate-button]`);
  }
}
