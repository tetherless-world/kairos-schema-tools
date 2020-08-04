import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("SDF document page table tab", () => {
  let page: SdfDocumentPage;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      page = new SdfDocumentPage(sdfDocument.id);
    });
  });

  beforeEach(() => page.visit());

  it("should show the source editor", () => {
    page.sourceTab.editor.textarea;
  });
});
