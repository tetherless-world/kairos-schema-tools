import {Page} from "./Page";
import {SdfDocumentEditor} from "./SdfDocumentEditor";

export class SdfDocumentPage extends Page {
  constructor(readonly id: string) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(id)}/`;
  }

  readonly editor = new SdfDocumentEditor();

  readonly relativeUrl: string;
}
