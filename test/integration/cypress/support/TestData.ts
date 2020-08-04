import {SdfDocument} from "./models/SdfDocument";

export class TestData {
  static readonly sdfDocumentId =
    "https://caci.com/kairos/Submissions/TA1/12345";

  static get sdfDocument(): Cypress.Chainable<SdfDocument> {
    return cy
      .request(
        `/api/rest/sdfdocument/${encodeURIComponent(TestData.sdfDocumentId)}`
      )
      .then((response) => {
        const sdfDocument: SdfDocument = response.body;
        sdfDocument.name = TestData.getSdfDocumentName(sdfDocument);
        return sdfDocument;
      });
  }

  private static getSdfDocumentName(sdfDocument: SdfDocument): string {
    if (sdfDocument.schemas.length > 0) {
      return sdfDocument.schemas[0].name;
    } else {
      return sdfDocument.id;
    }
  }

  static get sdfDocuments(): Cypress.Chainable<readonly SdfDocument[]> {
    return cy.request(`/api/rest/sdfdocument/`).then((response) => {
      const sdfDocuments: SdfDocument[] = response.body;
      for (const sdfDocument of sdfDocuments) {
        sdfDocument.name = TestData.getSdfDocumentName(sdfDocument);
      }
      return sdfDocuments;
    });
  }
}
