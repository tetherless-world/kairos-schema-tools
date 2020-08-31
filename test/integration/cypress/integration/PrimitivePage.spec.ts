import {TestData} from "../support/TestData";
import {PrimitivePage} from "../support/pages/PrimitivePage";
import {SdfDocumentPrimitivesPage} from "../support/pages/SdfDocumentPrimitivesPage";
import {SdfDocument} from "../support/models/SdfDocument";
import {Primitive} from "../support/models/Primitive";

context("Primitive page", () => {
  let page: PrimitivePage;
  let primitive: Primitive;
  let sdfDocument: SdfDocument;

  before(() => {
    TestData.sdfDocument.then((sdfDocument_) => {
      sdfDocument = sdfDocument_;
      primitive = sdfDocument.primitives[0];
      page = new PrimitivePage({
        primitiveId: primitive.id,
        sdfDocumentId: sdfDocument.id,
      });
    });
  });

  beforeEach(() => page.visit());

  it("should show a breadcrumb to all primitives", () => {
    page.standardLayout.breadcrumbs.primitives.click();
    new SdfDocumentPrimitivesPage({
      sdfDocumentId: sdfDocument.id,
    }).assertLoaded();
  });

  it("should show a breadcrumb to this primitive", () => {
    page.standardLayout.breadcrumbs.primitive.click();
    page.assertLoaded();
  });

  it("should show the primitive name in the title", () => {
    page.standardLayout.title.should(
      "have.text",
      "Primitive: " + primitive.name
    );
  });

  // it("should show the primitive identifier in the subtitle", () => {
  //   page.standardLayout.subtitle.should("have.text", primitive.id);
  // });
});
