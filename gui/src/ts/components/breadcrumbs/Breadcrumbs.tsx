import {Breadcrumbs as MuiBreadcrumbs} from "@material-ui/core";

import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Hrefs} from "Hrefs";
import * as React from "react";
import {Link} from "components/link/Link";

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  sdfDocument,
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
        {sdfDocument.label}
      </Link>
    ) : null}
    {sdfDocument.primitive ? (
      <Link
        color="inherit"
        dataCy="primitives-breadcrumb"
        to={
          sdfDocument
            ? Hrefs.sdfDocuments.sdfDocument(sdfDocument).primitives.toString()
            : Hrefs.primitives.toString()
        }
      >
        Primitives
      </Link>
    ) : null}
    {sdfDocument.primitive ? (
      <Link
        color="textPrimary"
        dataCy="primitive-breadcrumb"
        to={Hrefs.sdfDocuments
          .sdfDocument(sdfDocument)
          .primitives.primitive(sdfDocument.primitive)
          .toString()}
      >
        {sdfDocument.primitive.label}
      </Link>
    ) : null}
    {sdfDocument.schema ? (
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
    {sdfDocument.schema ? (
      <Link
        color="textPrimary"
        dataCy="schema-breadcrumb"
        to={Hrefs.sdfDocuments
          .sdfDocument(sdfDocument)
          .schemas.schema(sdfDocument.schema)
          .toString()}
      >
        {sdfDocument.schema.label}
      </Link>
    ) : null}
  </MuiBreadcrumbs>
);
