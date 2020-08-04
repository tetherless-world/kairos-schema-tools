import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";

context("SDF document page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentPage(sdfDocument.id);

  beforeEach(() => page.visit());

  it("should show a breadcrumb to all SDF documents", () => {
    page.standardLayout.breadcrumbs.sdfDocuments.click();
    new SdfDocumentsPage().assertLoaded();
  });

  it("should show a breadcrumb to this document", () => {
    page.standardLayout.breadcrumbs.sdfDocument.click();
    page.assertLoaded();
  });
});
