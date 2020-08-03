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
import {Link} from "components/Link";
import {ValidationMessageType} from "api/graphqlGlobalTypes";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

export const SdfDocumentCard: React.FunctionComponent<{
  id: string;
  name: string;
  schemas: {
    id: string;
    name: string;
    sdfDocumentId: string;
  }[];
  sdfVersion: string;
  validationMessageTypes: ValidationMessageType[];
}> = ({id, name, schemas, sdfVersion, validationMessageTypes}) => {
  return (
    <Card data-cy={"sdf-document-card-" + id}>
      <CardHeader
        title={
          <React.Fragment>
            <Link
              dataCy="sdf-document-name"
              to={Hrefs.sdfDocuments.sdfDocument({id}).toString()}
            >
              {name}
            </Link>
          </React.Fragment>
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
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell data-cy="sdf-document-version">
                    {sdfVersion}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
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
                <Link to={Hrefs.sdfDocuments.sdfDocument({id}).tab("source")}>
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
