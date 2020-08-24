import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {SchemasTable} from "components/schema/SchemasTable";
import {Link} from "components/link/Link";
import {ValidationMessageType} from "api/graphqlGlobalTypes";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {PrimitivesTable} from "components/schema/PrimitivesTable";

export const SdfDocumentCard: React.FunctionComponent<{
  sdfDocument: {
    id: string;
    label: string;
    primitives: {
      id: string;
      label: string;
      path: DefinitionPath;
    }[];
    schemas: {
      id: string;
      label: string;
      path: DefinitionPath;
    }[];
    sdfVersion: string;
    validationMessageTypes: ValidationMessageType[];
  };
}> = ({
  sdfDocument: {
    id,
    label,
    primitives,
    schemas,
    sdfVersion,
    validationMessageTypes,
  },
}) => {
  return (
    <Card data-cy={"sdf-document-card-" + id}>
      <CardHeader
        title={
          <Grid container>
            <Grid item xs={8}>
              <Link
                dataCy="sdf-document-name"
                to={Hrefs.sdfDocuments.sdfDocument({id}).toString()}
              >
                {label}
              </Link>
            </Grid>
            <Grid item xs={4} style={{textAlign: "right"}}>
              <SdfDocumentSourceLink to={{sdfDocument: {id}}} />
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Identifier</TableCell>
                  <TableCell data-cy="sdf-document-id">{id}</TableCell>
                </TableRow>
                {sdfVersion.length > 0 ? (
                  <TableRow>
                    <TableCell>Version</TableCell>
                    <TableCell data-cy="sdf-document-version">
                      {sdfVersion}
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Grid>
          {primitives.length > 0 ? (
            <Grid item data-cy="sdf-document-primitives">
              <Typography variant="h6">
                <Link
                  dataCy="sdf-document-primitives-header"
                  to={Hrefs.sdfDocuments
                    .sdfDocument({id})
                    .primitives.toString()}
                >
                  Primitives
                </Link>
              </Typography>
              <PrimitivesTable primitives={primitives} />
            </Grid>
          ) : null}
          {schemas.length > 0 ? (
            <Grid item data-cy="sdf-document-schemas">
              <Typography variant="h6">
                <Link
                  dataCy="sdf-document-schemas-header"
                  to={Hrefs.sdfDocuments.sdfDocument({id}).schemas.toString()}
                >
                  Schemas
                </Link>
              </Typography>
              <SchemasTable schemas={schemas} />
            </Grid>
          ) : null}
          {validationMessageTypes.length > 0 ? (
            <Grid item>
              <Typography variant="h6">
                {validationMessageTypes.map((type) => (
                  <React.Fragment key={type}>
                    {type === ValidationMessageType.Warning ? (
                      <WarningIcon />
                    ) : (
                      <ErrorIcon />
                    )}
                  </React.Fragment>
                ))}
                &nbsp;&nbsp;
                <Link to={Hrefs.sdfDocuments.sdfDocument({id}).toString()}>
                  Validation errors
                </Link>
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
  return <div></div>;
};
