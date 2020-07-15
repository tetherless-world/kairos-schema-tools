export abstract class Page {
  get absoluteUrl() {
    return Cypress.config().baseUrl + this.relativeUrl;
  }

  assertLoaded() {
    cy.url().should("eq", this.absoluteUrl);
  }

  readonly frame = {
    selector: "[data-cy=frame]",
    bodySelector: "[data-cy=frame] [data-cy=frame-content]",
  };

  abstract readonly relativeUrl: string;

  readonly standardLayout = {
    get subtitle() {
      return cy.get("[data-cy=standard-layout-subtitle]");
    },
    get title() {
      return cy.get("[data-cy=standard-layout-title]");
    },
  };

  visit() {
    cy.visit(this.relativeUrl);
    this.assertLoaded();
  }
}
