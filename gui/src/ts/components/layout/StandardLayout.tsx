import {Grid, Typography, Breadcrumbs, Link} from "@material-ui/core";
import * as React from "react";
import {Hrefs} from "Hrefs";
import {getSdfDocumentName} from "models/sdfDocument/getSdfDocumentName";

export const StandardLayout: React.FunctionComponent<React.PropsWithChildren<{
  breadcrumbs?: {
    schema?: {id: string; name: string};
    sdfDocument?: {id: string; schemas: {id: string; name: string}[]};
  };
  subtitle?: string;
  title: string;
}>> = ({breadcrumbs, children, subtitle, title}) => (
  <Grid container data-cy="standard-layout" direction="column" spacing={4}>
    {breadcrumbs ? (
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb" data-cy="breadcrumbs">
          {breadcrumbs.sdfDocument ? (
            <Link
              color="inherit"
              data-cy="sdf-documents-breadcrumb"
              href={Hrefs.sdfDocuments.toString()}
            >
              Schema data format documents
            </Link>
          ) : null}
          {breadcrumbs.sdfDocument ? (
            <Link
              color="textPrimary"
              data-cy="sdf-document-breadcrumb"
              href={Hrefs.sdfDocuments
                .sdfDocument(breadcrumbs.sdfDocument)
                .toString()}
            >
              {getSdfDocumentName(breadcrumbs.sdfDocument)}
            </Link>
          ) : null}
          {breadcrumbs.schema ? (
            <Link
              color="inherit"
              data-cy="schemas-breadcrumb"
              href={
                breadcrumbs.sdfDocument
                  ? Hrefs.sdfDocuments
                      .sdfDocument(breadcrumbs.sdfDocument)
                      .toString()
                  : Hrefs.schemas.toString()
              }
            >
              Schemas
            </Link>
          ) : null}
          {breadcrumbs.schema ? (
            <Link
              color="textPrimary"
              data-cy="schema-breadcrumb"
              href={
                breadcrumbs.sdfDocument
                  ? Hrefs.sdfDocuments
                      .sdfDocument(breadcrumbs.sdfDocument)
                      .schemas.schema(breadcrumbs.schema)
                      .toString()
                  : Hrefs.schemas.schema(breadcrumbs.schema).toString()
              }
            >
              {breadcrumbs.schema.name}
            </Link>
          ) : null}
        </Breadcrumbs>
      </Grid>
    ) : null}
    <Grid item container justify="center">
      <Grid item>
        <Grid container direction="column" spacing={4}>
          <Grid item container direction="column">
            <Grid item>
              <Typography
                data-cy="standard-layout-title"
                variant="h4"
                style={{textAlign: "center"}}
              >
                {title}
              </Typography>
            </Grid>
            {subtitle ? (
              <Grid item>
                <Typography
                  data-cy="standard-layout-subtitle"
                  variant="h6"
                  style={{textAlign: "center"}}
                >
                  {subtitle}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item container>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
