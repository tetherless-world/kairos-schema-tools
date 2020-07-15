import {Page} from "./Page";

export class SchemaPage extends Page {
  constructor(kwds: {schemaId: string; sdfDocumentId?: string}) {
    super();
    const relativeUrlSuffix = `/schema/${encodeURIComponent(kwds.schemaId)}`;
    this.relativeUrl = kwds.sdfDocumentId
      ? `/sdfdocument/${encodeURIComponent(kwds.sdfDocumentId)}` +
        relativeUrlSuffix
      : relativeUrlSuffix;
    this.schemaId = kwds.schemaId;
    this.sdfDocumentId = kwds.sdfDocumentId;
  }

  readonly relativeUrl: string;
  readonly schemaId: string;
  readonly sdfDocumentId?: string;
}
