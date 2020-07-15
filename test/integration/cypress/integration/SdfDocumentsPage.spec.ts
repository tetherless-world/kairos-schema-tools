import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemaPage} from "../support/pages/SchemaPage";
import {SchemasPage} from "../support/pages/SchemasPage";

context("SDF documents page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentsPage();

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    page
      .sdfDocument(sdfDocument.id)
      .sdfDocumentName.should("have.text", sdfDocument.schemas[0].name);
  });

  it("should show the document id", () => {
    page
      .sdfDocument(sdfDocument.id)
      .sdfDocumentId.should("have.text", sdfDocument.id);
  });

  it("should link each document's page", () => {
    page.sdfDocument(sdfDocument.id).sdfDocumentName.click();
    new SdfDocumentPage(sdfDocument.id).assertLoaded();
  });

  it("should list each document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page
        .sdfDocument(sdfDocument.id)
        .schemas.schema(schema.id)
        .id.should("have.text", schema.id);
      page
        .sdfDocument(sdfDocument.id)
        .schemas.schema(schema.id)
        .name.should("have.text", schema.name);
    }
  });

  it("should link to another page with all of each document's schemas", () => {
    page.sdfDocument(sdfDocument.id).schemas.header.click();
    new SchemasPage({sdfDocumentId: sdfDocument.id}).assertLoaded();
  });

  it("should link to the document's schemas individually", () => {
    const schema = sdfDocument.schemas[0];
    page
      .sdfDocument(sdfDocument.id)
      .schemas.schema(schema.id)
      .id.find("a")
      .click();
    new SchemaPage({
      schemaId: schema.id,
      sdfDocumentId: sdfDocument.id,
    }).assertLoaded();
  });
});
