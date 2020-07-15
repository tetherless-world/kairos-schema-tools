import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";

context("SDF document page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentPage(sdfDocument.id);

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    page.card.sdfDocumentName.should("have.text", sdfDocument.schemas[0].name);
  });

  it("should show the document id", () => {
    page.card.sdfDocumentId.should("have.text", sdfDocument.id);
  });

  it("should show a breadcrumb to all SDF documents", () => {
    page.standardLayout.breadcrumbs.sdfDocuments.click();
    new SdfDocumentsPage().assertLoaded();
  });

  it("should show a breadcrumb to this document", () => {
    page.standardLayout.breadcrumbs.sdfDocument.click();
    page.assertLoaded();
  });

  it("should list the document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page.card.schema(schema.id).schemaId.should("have.text", schema.id);
      page.card.schema(schema.id).schemaName.should("have.text", schema.name);
    }
  });
});
