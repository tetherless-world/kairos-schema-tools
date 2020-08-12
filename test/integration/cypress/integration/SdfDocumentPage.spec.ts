import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("SDF document page", () => {
  let page: SdfDocumentPage;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      page = new SdfDocumentPage(sdfDocument.id);
    });
  });

  beforeEach(() => page.visit());

  it("should show a breadcrumb to all SDF documents", () => {
    page.standardLayout.breadcrumbs.sdfDocuments.click();
    new SdfDocumentsPage().assertLoaded();
  });

  it("should show a breadcrumb to this document", () => {
    page.standardLayout.breadcrumbs.sdfDocument.click();
    page.assertLoaded();
  });

  it("should show the source editor", () => {
    page.editor.textarea;
  });
});
