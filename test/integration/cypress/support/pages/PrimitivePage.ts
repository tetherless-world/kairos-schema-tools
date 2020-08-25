import {Page} from "./Page";

export class PrimitivePage extends Page {
  constructor(kwds: {primitiveId: string; sdfDocumentId: string}) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(
      kwds.sdfDocumentId
    )}/primitive/${encodeURIComponent(kwds.primitiveId)}`;
    this.primitiveId = kwds.primitiveId;
    this.sdfDocumentId = kwds.sdfDocumentId;
  }

  get details() {
    const detailsSelector = "[data-cy=primitive-details]";
    return {
      get id() {
        return cy.get(`${detailsSelector} [data-cy=primitive-id]`);
      },
      get name() {
        return cy.get(`${detailsSelector} [data-cy=primitive-name]`);
      },
    };
  }

  get toc() {
    const tocSelector = "[data-cy=primitive-toc]";
    return {
      get detailsLink() {
        return cy.get(`${tocSelector} [data-cy=primitive-toc-details-link]`);
      },
    };
  }

  readonly relativeUrl: string;
  readonly primitiveId: string;
  readonly sdfDocumentId?: string;
}
