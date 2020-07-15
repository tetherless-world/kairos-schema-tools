import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemaPage} from "../support/pages/SchemaPage";

context("SDF documents page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SdfDocumentPage(sdfDocument.id);

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    page.standardLayout.subtitle.should("have.text", sdfDocument.id);
  });

  it("should list the document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page.card.schema(schema.id).schemaId.should("have.text", schema.id);
      page.card.schema(schema.id).schemaName.should("have.text", schema.name);
    }
  });

  it("should link to schemas", () => {
    const schema = sdfDocument.schemas[0];
    page.card.schema(schema.id).schemaId.find("a").click();
    new SchemaPage({
      schemaId: schema.id,
      sdfDocumentId: sdfDocument.id,
    }).assertLoaded();
  });
});
