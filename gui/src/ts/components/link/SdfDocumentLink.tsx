import {Link} from "components/link/Link";
import * as React from "react";
import {Hrefs} from "Hrefs";

export const SdfDocumentLink: React.FunctionComponent<{
  sdfDocument: {id: string; label: string};
  textPrefix?: string;
}> = ({sdfDocument, textPrefix}) => (
  <Link
    dataCy="sdf-document-name"
    to={Hrefs.sdfDocuments.sdfDocument(sdfDocument).toString()}
  >
    {textPrefix}
    {sdfDocument.label}
  </Link>
);
