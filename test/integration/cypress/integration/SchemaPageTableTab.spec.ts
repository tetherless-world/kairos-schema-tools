import {TestData} from "../support/TestData";
import {SchemaPage} from "../support/pages/SchemaPage";
import {Schema} from "../support/models/Schema";
import {SdfDocument} from "../support/models/SdfDocument";

context("Schema page table tab", () => {
  let page: SchemaPage;
  let schema: Schema;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      schema = sdfDocument.schemas[0];
      page = new SchemaPage({
        schemaId: schema.id,
        sdfDocumentId: sdfDocument.id,
      });
    });
  });

  beforeEach(() => page.visit());

  it("should jump to details from the table of contents", () => {
    page.tableTab.toc.detailsLink.click();
  });

  it("should show schema details", () => {
    // page.tableTab.details.id.should("have.text", schema.id);
    page.tableTab.details.name.should("have.text", schema.name);
  });
});
