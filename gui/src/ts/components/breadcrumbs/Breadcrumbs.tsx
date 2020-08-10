import {Breadcrumbs as MuiBreadcrumbs} from "@material-ui/core";

import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Hrefs} from "Hrefs";
import * as React from "react";
import {Link} from "components/link/Link";

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  schema,
  sdfDocument,
  sdfDocumentSource,
}) => (
  <MuiBreadcrumbs aria-label="breadcrumb" data-cy="breadcrumbs">
    {sdfDocument ? (
      <Link
        color="inherit"
        dataCy="sdf-documents-breadcrumb"
        to={Hrefs.sdfDocuments.toString()}
      >
        Schema data format documents
      </Link>
    ) : null}
    {sdfDocument ? (
      <Link
        color="textPrimary"
        dataCy="sdf-document-breadcrumb"
        to={Hrefs.sdfDocuments.sdfDocument(sdfDocument).toString()}
      >
        {sdfDocument.name}
      </Link>
    ) : null}
    {sdfDocumentSource ? (
      <Link
        color="inherit"
        data-cy="sdf-document-source-breadcrumb"
        to={Hrefs.sdfDocuments.sdfDocument(sdfDocument).source()}
      >
        Source
      </Link>
    ) : null}
    {schema ? (
      <Link
        color="inherit"
        dataCy="schemas-breadcrumb"
        to={
          sdfDocument
            ? Hrefs.sdfDocuments.sdfDocument(sdfDocument).schemas.toString()
            : Hrefs.schemas.toString()
        }
      >
        Schemas
      </Link>
    ) : null}
    {schema ? (
      <Link
        color="textPrimary"
        dataCy="schema-breadcrumb"
        to={Hrefs.sdfDocuments
          .sdfDocument(sdfDocument)
          .schemas.schema(schema)
          .toString()}
      >
        {schema.name}
      </Link>
    ) : null}
  </MuiBreadcrumbs>
);
