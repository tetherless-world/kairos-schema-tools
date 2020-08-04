import {TestData} from "../support/TestData";
import {SchemaPage} from "../support/pages/SchemaPage";

context("Schema page table tab", () => {
  const sdfDocument = TestData.sdfDocument;
  const schema = sdfDocument.schemas[0];
  const page = new SchemaPage({
    schemaId: schema.id,
    sdfDocumentId: sdfDocument.id,
  });

  beforeEach(() => page.visit());

  it("should jump to details from the table of contents", () => {
    page.tableTab.toc.detailsLink.click();
  });

  it("should show schema details", () => {
    page.tableTab.details.id.should("have.text", schema.id);
    page.tableTab.details.name.should("have.text", schema.name);
  });
});
