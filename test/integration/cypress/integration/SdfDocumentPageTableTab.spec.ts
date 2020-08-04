import {TestData} from "../support/TestData";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemasPage} from "../support/pages/SchemasPage";
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

  it("should show the document name", () => {
    page.tableTab.card.sdfDocumentName.should("have.text", sdfDocument.name);
  });

  it("should show the document id ", () => {
    page.tableTab.card.sdfDocumentId.should("have.text", sdfDocument.id);
  });

  it("should list the document's schemas", () => {
    for (const schema of sdfDocument.schemas) {
      page.tableTab.card.schemasTable
        .schema(schema.id)
        .id.should("have.text", schema.id);
      page.tableTab.card.schemasTable
        .schema(schema.id)
        .name.should("have.text", schema.name);
    }
  });

  it("should link to another page with the document's schemas", () => {
    page.tableTab.card.schemasHeader.click();
    new SchemasPage({sdfDocumentId: sdfDocument.id}).assertLoaded();
  });
});
