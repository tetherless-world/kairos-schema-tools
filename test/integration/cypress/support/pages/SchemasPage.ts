import {Page} from "./Page";

export class SchemasPage extends Page {
  constructor(kwds?: {sdfDocumentId?: string}) {
    super();
    const relativeUrlSuffix = `/schema/`;
    this.sdfDocumentId = kwds ? kwds.sdfDocumentId : undefined;
    this.relativeUrl = this.sdfDocumentId
      ? `/sdfdocument/${encodeURIComponent(this.sdfDocumentId)}` +
        relativeUrlSuffix
      : relativeUrlSuffix;
  }

  readonly relativeUrl: string;
  readonly sdfDocumentId?: string;
}
