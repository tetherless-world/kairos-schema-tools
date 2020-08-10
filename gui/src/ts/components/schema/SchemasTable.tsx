import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {SourceLink} from "components/link/SourceLink";

export const SchemasTable: React.FunctionComponent<{
  schemas: {id: string; name: string; sdfDocumentId: string}[];
}> = ({schemas}) => (
  <Table data-cy="schemas-table">
    <TableHead>
      <TableRow>
        <TableCell>Identifier</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Source</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schemas.map((schema) => {
        const schemaHref = Hrefs.sdfDocuments
          .sdfDocument({id: schema.sdfDocumentId})
          .schemas.schema(schema)
          .toString();
        return (
          <TableRow data-cy={"schema-" + schema.id} key={schema.id}>
            <TableCell data-cy="schema-id">
              <Link to={schemaHref}>{schema.id}</Link>
            </TableCell>
            <TableCell data-cy="schema-name">
              <Link to={schemaHref}>{schema.name}</Link>
            </TableCell>
            <TableCell data-cy="schema-source">
              <SourceLink
                to={{schemaId: schema.id, sdfDocumentId: schema.sdfDocumentId}}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
