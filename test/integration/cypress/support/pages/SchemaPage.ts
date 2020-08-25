import {Page} from "./Page";

export class SchemaPage extends Page {
  constructor(kwds: {schemaId: string; sdfDocumentId: string}) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(
      kwds.sdfDocumentId
    )}/schema/${encodeURIComponent(kwds.schemaId)}`;
    this.schemaId = kwds.schemaId;
    this.sdfDocumentId = kwds.sdfDocumentId;
  }

  get tableTab() {
    cy.get("[data-cy=table-tab]").click();
    return {
      get toc() {
        const tocSelector = "[data-cy=schema-toc]";
        return {
          get detailsLink() {
            return cy.get(`${tocSelector} [data-cy=schema-toc-details-link]`);
          },
        };
      },
      get details() {
        const detailsSelector = "[data-cy=schema-details]";
        return {
          get id() {
            return cy.get(`${detailsSelector} [data-cy=schema-id]`);
          },
          get name() {
            return cy.get(`${detailsSelector} [data-cy=schema-name]`);
          },
        };
      },
      get steps() {
        const stepsSelector = "[data-cy=schema-steps]";
        return {
          step(id: string) {
            const stepSelector = `${stepsSelector} [data-cy="schema-step-${id}"]`;
            return {
              get id() {
                return cy.get(`${stepSelector} [data-cy=step-id]`);
              },
              get name() {
                return cy.get(`${stepSelector} [data-cy=step-name]`);
              },
            };
          },
        };
      },
    };
  }

  readonly relativeUrl: string;
  readonly schemaId: string;
  readonly sdfDocumentId?: string;
}
