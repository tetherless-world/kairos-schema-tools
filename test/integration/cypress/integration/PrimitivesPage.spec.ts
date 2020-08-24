import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {PrimitivesPage} from "../support/pages/PrimitivesPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("Primitives page", () => {
  let sdfDocument: SdfDocument;
  let page: PrimitivesPage;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      page = new PrimitivesPage({sdfDocumentId: sdfDocument.id});
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

  it("should list the document's primitives", () => {
    for (const primitive of sdfDocument.primitives) {
      page.primitivesTable
        .primitive(primitive.id)
        .id.should("have.text", primitive.id);
      page.primitivesTable
        .primitive(primitive.id)
        .name.should("have.text", primitive.name);
    }
  });
});
