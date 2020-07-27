import {Breadcrumbs as MuiBreadcrumbs, Link} from "@material-ui/core";

import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Hrefs} from "Hrefs";
import * as React from "react";

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  schema,
  sdfDocument,
}) => (
  <MuiBreadcrumbs aria-label="breadcrumb" data-cy="breadcrumbs">
    {sdfDocument ? (
      <Link
        color="inherit"
        data-cy="sdf-documents-breadcrumb"
        href={Hrefs.sdfDocuments.toString()}
      >
        Schema data format documents
      </Link>
    ) : null}
    {sdfDocument ? (
      <Link
        color="textPrimary"
        data-cy="sdf-document-breadcrumb"
        href={Hrefs.sdfDocuments.sdfDocument(sdfDocument).toString()}
      >
        {sdfDocument.name}
      </Link>
    ) : null}
    {schema ? (
      <Link
        color="inherit"
        data-cy="schemas-breadcrumb"
        href={
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
        href={
          sdfDocument
            ? Hrefs.sdfDocuments
                .sdfDocument(sdfDocument)
                .schemas.schema(schema)
                .toString()
            : Hrefs.schemas.schema(schema).toString()
        }
      >
        {schema.name}
      </Link>
    ) : null}
  </MuiBreadcrumbs>
);
