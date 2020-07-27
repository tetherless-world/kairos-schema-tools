import {SdfDocumentsPage} from "../support/pages/SdfDocumentsPage";
import {SdfDocumentPage} from "../support/pages/SdfDocumentPage";
import {SchemasPage} from "../support/pages/SchemasPage";
import {TestData} from "../support/TestData";
import {SearchResultsPage} from "../support/pages/SearchResultsPage";

context("Navbar", () => {
  const sdfDocument = TestData.sdfDocument;
  const homePage = new SdfDocumentsPage();
  const otherPage = new SdfDocumentPage(sdfDocument.id);

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
