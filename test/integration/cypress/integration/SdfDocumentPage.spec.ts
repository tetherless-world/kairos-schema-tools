import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SchemasPage} from "../support/pages/SchemasPage";

context("SDF document page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentPage(sdfDocument.id);

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    page.card.sdfDocumentName.should("have.text", sdfDocument.name);
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
      page.card.schemas.schema(schema.id).id.should("have.text", schema.id);
      page.card.schemas.schema(schema.id).name.should("have.text", schema.name);
    }
  });

  it("should link to another page with the document's schemas", () => {
    page.card.schemas.header.click();
    new SchemasPage({sdfDocumentId: sdfDocument.id}).assertLoaded();
  });
});
