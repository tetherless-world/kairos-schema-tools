import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
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
  schemas: {
    id: string;
    name: string;
  }[];
}> = ({id, schemas}) => {
  let documentName: string;
  if (schemas.length === 1) {
    documentName = schemas[0].name;
  } else {
    if (id.startsWith("file:")) {
      documentName = id.split("/").pop()!;
    } else {
      documentName = id;
    }
  }

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
              {documentName}
            </Link>
          </React.Fragment>
        }
      />
      <CardContent>
        <Typography variant="h5">Schemas</Typography>
        <Table data-cy="sdf-document-schemas">
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
      </CardContent>
    </Card>
  );
  return <div></div>;
};
