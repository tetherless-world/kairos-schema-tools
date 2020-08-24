import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentSchemasPage} from "../support/pages/SdfDocumentSchemasPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("SDF document schemas page", () => {
  let sdfDocument: SdfDocument;
  let page: SdfDocumentSchemasPage;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      page = new SdfDocumentSchemasPage({sdfDocumentId: sdfDocument.id});
    });
  });

  beforeEach(() => page.visit());

  it("should show the document name and link back to the document", () => {
    page.sdfDocumentName.should("have.text", sdfDocument.name);
    page.sdfDocumentName.click();
    new SdfDocumentPage(sdfDocument.id).assertLoaded();
  });

  it("should show a breadcrumb to all SDF documents", () => {
    page.standardLayout.breadcrumbs.sdfDocuments.click();
    new SdfDocumentsPage().assertLoaded();
  });

  it("should show a breadcrumb to this document", () => {
    page.standardLayout.breadcrumbs.sdfDocument.click();
    new SdfDocumentPage(sdfDocument.id).assertLoaded();
  });

  it("should list the document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page.schemasTable.schema(schema.id).id.should("have.text", schema.id);
      page.schemasTable.schema(schema.id).name.should("have.text", schema.name);
    }
  });
});
