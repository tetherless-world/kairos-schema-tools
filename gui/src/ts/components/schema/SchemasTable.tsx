import * as React from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {Hrefs} from "Hrefs";

export const SchemasTable: React.FunctionComponent<{
  schemas: {id: string; name: string}[];
  sdfDocumentId?: string;
}> = ({schemas, sdfDocumentId}) => (
  <Table data-cy="schemas-table">
    <TableHead>
      <TableRow>
        <TableCell>Schema identifier</TableCell>
        <TableCell>Schema name</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schemas.map((schema) => {
        const schemaHref = sdfDocumentId
          ? Hrefs.sdfDocuments
              .sdfDocument({id: sdfDocumentId})
              .schemas.schema(schema)
              .toString()
          : Hrefs.schemas.schema(schema).toString();
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
);
