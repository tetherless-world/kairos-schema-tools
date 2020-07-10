import {Page} from "./Page";
import {SdfDocumentCard} from "./SdfDocumentCard";

export class SdfDocumentPage extends Page {
  constructor(readonly id: string) {
    super();
    this.relativeUrl = `/sdfdocument/${encodeURIComponent(id)}/`;
  }

  get card() {
    return new SdfDocumentCard(this.id);
  }

  readonly relativeUrl: string;
}
