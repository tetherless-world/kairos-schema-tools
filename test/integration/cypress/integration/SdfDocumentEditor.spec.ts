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
    page.editor.textarea;
  });

  it("should indicate no validation messages by default", () => {
    page.editor.validationMessages.noValidationMessages;
  });

  it("should validate the document unchanged", () => {
    page.editor.validateButton.click();
  });

  it("should show a validation message when invalid text is inserted", () => {
    page.editor.textarea.type("invalid text", {force: true});
    page.editor.validateButton.click();
    page.editor.validationMessages.fatal
      .validationMessage(0)
      .should("contain", "Unrecognized token");
  });
});
