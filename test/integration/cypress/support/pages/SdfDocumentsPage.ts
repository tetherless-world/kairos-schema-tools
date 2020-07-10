import {Page} from "./Page";
import {SdfDocumentCard} from "./SdfDocumentCard";

export class SdfDocumentsPage extends Page {
  sdfDocument(id: string) {
    return new SdfDocumentCard(`[data-cy="sdf-document-card-${id}"]`);
  }

  readonly relativeUrl = "/sdfdocument/";
}
