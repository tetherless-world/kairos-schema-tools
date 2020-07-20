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
    breadcrumbs: {
      get schema() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=schema-breadcrumb]"
        );
      },
      get schemas() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=schemas-breadcrumb]"
        );
      },
      get sdfDocument() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=sdf-document-breadcrumb]"
        );
      },
      get sdfDocuments() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=sdf-documents-breadcrumb]"
        );
      },
    },
    get subtitle() {
      return cy.get(
        "[data-cy=standard-layout] [data-cy=standard-layout-subtitle]"
      );
    },
    get title() {
      return cy.get(
        "[data-cy=standard-layout] [data-cy=standard-layout-title]"
      );
    },
  };

  visit() {
    cy.visit(this.relativeUrl);
    this.assertLoaded();
  }
}
