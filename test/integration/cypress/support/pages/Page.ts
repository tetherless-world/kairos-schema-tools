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
    navbar: {
      get brandLink() {
        return cy.get(this.selector + " [data-cy=brand-link]");
      },
      get primitivesLink() {
        return cy.get(this.selector + " [data-cy=primitives-nav-link]");
      },
      get schemasLink() {
        return cy.get(this.selector + " [data-cy=schemas-nav-link]");
      },
      get sdfDocumentsLink() {
        return cy.get(this.selector + " [data-cy=sdf-documents-nav-link]");
      },
      search(text: string) {
        this.searchInput.type(text);
        this.searchButton.click();
      },
      get searchButton() {
        return cy.get(this.selector + " [data-cy=search-button]");
      },
      get searchInput() {
        return cy.get(this.selector + " [data-cy=search-input]");
      },
      selector: "[data-cy=navbar]",
    },
  };

  abstract readonly relativeUrl: string;

  readonly standardLayout = {
    breadcrumbs: {
      get primitive() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=primitive-breadcrumb]"
        );
      },
      get primitives() {
        return cy.get(
          "[data-cy=standard-layout] [data-cy=breadcrumbs] [data-cy=primitives-breadcrumb]"
        );
      },
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
