import {TestData} from "../support/TestData";
import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemaPage} from "../support/pages/SchemaPage";
import {SdfDocumentSchemasPage} from "../support/pages/SdfDocumentSchemasPage";
import {SdfDocument} from "../support/models/SdfDocument";

context("SDF documents page", () => {
  const page = new SdfDocumentsPage();
  let sdfDocuments: readonly SdfDocument[];

  before(() => {
    TestData.sdfDocuments.then((sdfDocuments_) => {
      sdfDocuments = sdfDocuments_;
    });
  });

  beforeEach(() => page.visit());

  it("should show the document name", () => {
    for (const sdfDocument of sdfDocuments) {
      page
        .sdfDocument(sdfDocument.id)
        .sdfDocumentName.should("have.text", sdfDocument.name);
    }
  });

  // it("should show the document id", () => {
  //   for (const sdfDocument of sdfDocuments) {
  //     page
  //       .sdfDocument(sdfDocument.id)
  //       .sdfDocumentId.should("have.text", sdfDocument.id);
  //   }
  // });

  it("should link to each document's page", () => {
    for (const sdfDocument of sdfDocuments) {
      page.sdfDocument(sdfDocument.id).sdfDocumentName.click();
      new SdfDocumentPage(sdfDocument.id).assertLoaded();
      page.visit();
    }
  });

  it("should list each document's schemas", () => {
    for (const sdfDocument of sdfDocuments) {
      for (const schema of sdfDocument.schemas) {
        // page
        //   .sdfDocument(sdfDocument.id)
        //   .schemasTable.schema(schema.id)
        //   .id.should("have.text", schema.id);
        page
          .sdfDocument(sdfDocument.id)
          .schemasTable.schema(schema.id)
          .name.should("have.text", schema.name);
      }
    }
  });

  it("should link to another page with all of each document's schemas", () => {
    for (const sdfDocument of sdfDocuments) {
      page.sdfDocument(sdfDocument.id).schemasHeader.click();
      new SdfDocumentSchemasPage({
        sdfDocumentId: sdfDocument.id,
      }).assertLoaded();
      page.visit();
    }
  });

  it("should link to the document's schemas individually", () => {
    for (const sdfDocument of sdfDocuments) {
      const schema = sdfDocument.schemas[0];
      page
        .sdfDocument(sdfDocument.id)
        .schemasTable.schema(schema.id)
        .id.find("a")
        .click();
      new SchemaPage({
        schemaId: schema.id,
        sdfDocumentId: sdfDocument.id,
      }).assertLoaded();
      page.visit();
    }
  });
});
