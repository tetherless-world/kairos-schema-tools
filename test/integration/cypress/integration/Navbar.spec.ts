import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {TestData} from "../support/TestData";
import {SearchResultsPage} from "../support/pages/SearchResultsPage";
import {SdfDocument} from "../support/models/SdfDocument";
import {SchemasPage} from "../support/pages/SchemasPage";
import {PrimitivesPage} from "../support/pages/PrimitivesPage";

context("Navbar", () => {
  const homePage = new SdfDocumentsPage();
  let otherPage: SdfDocumentPage;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      otherPage = new SdfDocumentPage(sdfDocument.id);
    });
  });

  it("should link to primitives", () => {
    homePage.visit();
    homePage.frame.navbar.primitivesLink.click();
    new PrimitivesPage().assertLoaded();
  });

  it("should link to schemas", () => {
    homePage.visit();
    homePage.frame.navbar.schemasLink.click();
    new SchemasPage().assertLoaded();
  });

  it("should link to SDF documents", () => {
    otherPage.visit();
    otherPage.frame.navbar.sdfDocumentsLink.click();
    new SdfDocumentsPage().assertLoaded();
  });

  it("should search with typing and hitting enter", () => {
    homePage.visit();
    const text = "test";
    homePage.frame.navbar.searchInput.type(text + "{enter}");
    new SearchResultsPage(text).assertLoaded();
  });

  it("should search with typing and clicking the search button", () => {
    homePage.visit();
    const text = "test";
    homePage.frame.navbar.searchInput.type(text);
    homePage.frame.navbar.searchButton.click();
    new SearchResultsPage(text).assertLoaded();
  });
});
