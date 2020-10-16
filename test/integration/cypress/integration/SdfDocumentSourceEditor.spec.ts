import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("SDF document editor tab", () => {
  let page: SdfDocumentPage;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      page = new SdfDocumentPage(sdfDocument.id);
    });
  });

  beforeEach(() => page.visit());

  it("should show the document source in a text area", () => {
    page.sourceTab.editor.textarea;
  });

  it("should indicate no validation messages by default", () => {
    page.validationTab.validationMessages.noValidationMessages;
  });

  it("should validate the document unchanged", () => {
    page.sourceTab.editor.validateButton.click();
  });

  it("should show a validation message when invalid text is inserted", () => {
    page.sourceTab.editor.textarea.type("invalid text", {force: true});
    page.sourceTab.editor.validateButton.click();
    page.validationTab.validationMessages.fatal
      .validationMessage(0)
      .should("contain", "Unrecognized token");
  });
});
