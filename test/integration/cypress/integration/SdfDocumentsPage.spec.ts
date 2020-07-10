import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemaPage} from "../support/pages/SchemaPage";

context("SDF documents page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentsPage();

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    page
      .sdfDocument(sdfDocument.id)
      .sdfDocumentName.should("have.text", sdfDocument.schemas[0].name);
  });

  it("should link to the document page", () => {
    page.sdfDocument(sdfDocument.id).sdfDocumentName.click();
    new SdfDocumentPage(sdfDocument.id).assertLoaded();
  });

  it("should list a document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page
        .sdfDocument(sdfDocument.id)
        .schema(schema.id)
        .schemaId.should("have.text", schema.id);
      page
        .sdfDocument(sdfDocument.id)
        .schema(schema.id)
        .schemaName.should("have.text", schema.name);
    }
  });

  it("should link to schemas", () => {
    const schema = sdfDocument.schemas[0];
    page
      .sdfDocument(sdfDocument.id)
      .schema(schema.id)
      .schemaId.find("a")
      .click();
    new SchemaPage({
      schemaId: schema.id,
      sdfDocumentId: sdfDocument.id,
    }).assertLoaded();
  });
});
