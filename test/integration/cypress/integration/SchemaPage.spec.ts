import {TestData} from "../support/TestData";
import {SchemaPage} from "../support/pages/SchemaPage";
import {SchemasPage} from "../support/pages/SchemasPage";

context("Schema page", () => {
  const sdfDocument = TestData.sdfDocument;
  const schema = sdfDocument.schemas[0];
  const page = new SchemaPage({
    schemaId: schema.id,
    sdfDocumentId: sdfDocument.id,
  });

  beforeEach(() => page.visit());

  it("should show a breadcrumb to all schemas", () => {
    page.standardLayout.breadcrumbs.schemas.click();
    new SchemasPage({sdfDocumentId: sdfDocument.id}).assertLoaded();
  });

  it("should show a breadcrumb to this schema", () => {
    page.standardLayout.breadcrumbs.schema.click();
    page.assertLoaded();
  });

  it("should show the schema name in the title", () => {
    page.standardLayout.title.should("have.text", "Schema: " + schema.name);
  });

  it("should show the schema identifier in the subtitle", () => {
    page.standardLayout.subtitle.should("have.text", schema.id);
  });
});
