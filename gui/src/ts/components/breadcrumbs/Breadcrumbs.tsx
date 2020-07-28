import {Breadcrumbs as MuiBreadcrumbs} from "@material-ui/core";

import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Hrefs} from "Hrefs";
import * as React from "react";
import {Link} from "components/Link";

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  schema,
  sdfDocument,
}) => (
  <MuiBreadcrumbs aria-label="breadcrumb" data-cy="breadcrumbs">
    {sdfDocument ? (
      <Link
        color="inherit"
        data-cy="sdf-documents-breadcrumb"
        to={Hrefs.sdfDocuments.toString()}
      >
        Schema data format documents
      </Link>
    ) : null}
    {sdfDocument ? (
      <Link
        color="textPrimary"
        data-cy="sdf-document-breadcrumb"
        to={Hrefs.sdfDocuments.sdfDocument(sdfDocument).toString()}
      >
        {sdfDocument.name}
      </Link>
    ) : null}
    {schema ? (
      <Link
        color="inherit"
        data-cy="schemas-breadcrumb"
        to={
          sdfDocument
            ? Hrefs.sdfDocuments.sdfDocument(sdfDocument).toString()
            : Hrefs.schemas.toString()
        }
      >
        Schemas
      </Link>
    ) : null}
    {schema ? (
      <Link
        color="textPrimary"
        data-cy="schema-breadcrumb"
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
