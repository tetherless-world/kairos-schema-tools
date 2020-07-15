import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {Hrefs} from "Hrefs";

export const SdfDocumentCard: React.FunctionComponent<{
  id: string;
  name: string;
  schemas: {
    id: string;
    name: string;
  }[];
}> = ({id, name, schemas}) => {
  return (
    <Card data-cy={"sdf-document-card-" + id}>
      <CardHeader
        title={
          <React.Fragment>
            <Link
              component="a"
              data-cy="sdf-document-name"
              href={Hrefs.sdfDocuments.sdfDocument({id}).toString()}
            >
              {name}
            </Link>
          </React.Fragment>
        }
      />
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h6">
              Identifier: <span data-cy="sdf-document-id">{id}</span>
            </Typography>
          </Grid>
          <Grid item data-cy="sdf-document-schemas">
            <Typography variant="h5">
              <Link
                data-cy="sdf-document-schemas-header"
                href={Hrefs.sdfDocuments.sdfDocument({id}).schemas.toString()}
              >
                Schemas
              </Link>
            </Typography>
            <Table data-cy="sdf-document-schemas-table">
              <TableHead>
                <TableRow>
                  <TableCell>Schema identifier</TableCell>
                  <TableCell>Schema name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schemas.map((schema) => {
                  const schemaHref = Hrefs.sdfDocuments
                    .sdfDocument({id})
                    .schemas.schema(schema)
                    .toString();
                  return (
                    <TableRow data-cy={"schema-" + schema.id}>
                      <TableCell data-cy="schema-id">
                        <Link component="a" href={schemaHref}>
                          {schema.id}
                        </Link>
                      </TableCell>
                      <TableCell data-cy="schema-name">
                        <Link component="a" href={schemaHref}>
                          {schema.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  return <div></div>;
};
