import {TestData} from "../support/TestData";
import {SearchResultsPage} from "../support/pages/SearchResultsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemaPage} from "../support/pages/SchemaPage";

context("Search results page", () => {
  const sdfDocument = TestData.sdfDocument;
  const page = new SearchResultsPage(sdfDocument.name);

  beforeEach(() => page.visit());

  it("should show the document in the results", () => {
    const row = page.table.row(sdfDocument.id);
    row.type.should("have.text", "SdfDocument");
    row.labelLink.should("have.text", `SDF document: ${sdfDocument.name}`);
    row.labelLink.click();
    new SdfDocumentPage(sdfDocument.id).assertLoaded();
  });

  it("should show the schema in the results", () => {
    const schema = sdfDocument.schemas[0];
    const row = page.table.row(schema.id);
    row.type.should("have.text", "Schema");
    row.labelLink.should("have.text", `Schema: ${schema.name}`);
    row.labelLink.click();
    new SchemaPage({
      schemaId: schema.id,
      sdfDocumentId: sdfDocument.id,
    }).assertLoaded();
  });

  it("should accept another search in the navbar", () => {
    page.table.row(sdfDocument.id).get();
    page.frame.navbar.search("bomb");
    page.table
      .row(
        "https://caci.com/kairos/Schemas/CoordinatedBombingAttack/Steps/bombing"
      )
      .type.should("have.text", "Step");
    page.table.row(sdfDocument.id).get().should("not.exist");
  });
});
