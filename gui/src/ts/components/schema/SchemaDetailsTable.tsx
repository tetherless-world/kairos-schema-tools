import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {Hrefs} from "Hrefs";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {SchemaPageSchema} from "components/schema/SchemaPageSchema";
import {Link} from "components/link/Link";

export const SchemaDetailsTable: React.FunctionComponent<{
  schema: SchemaPageSchema;
}> = ({schema}) => (
  <Table>
    <TableBody>
      <StringFieldTableRow
        name="Name"
        value={schema.name}
        valueDataCy="schema-name"
      />
      <StringFieldTableRow
        name="Identifier"
        value={schema.id}
        valueDataCy="schema-id"
      />
      {schema.super ? (
        <TableRow>
          <TableCell>Super</TableCell>
          <TableCell data-cy="schema-super">
            <Link
              to={Hrefs.sdfDocuments
                .sdfDocument({id: schema.sdfDocumentId})
                .schemas.schema({id: schema.super})
                .toString()}
            >
              {schema.super}
            </Link>
          </TableCell>
        </TableRow>
      ) : null}
      <TableRow>
        <TableCell>Performers</TableCell>
        <TableCell>{schema.ta2 ? "TA2" : "TA1"}</TableCell>
      </TableRow>
      <StringListFieldTableRow
        direction="column"
        name="Also known as"
        values={schema.aka}
        valuesDataCy="schema-aka"
      />
      <StringListFieldTableRow
        direction="column"
        name="Comments"
        values={schema.comments}
        valuesDataCy="schema-comments"
      />
      <StringFieldTableRow
        name="Description"
        value={schema.description}
        valueDataCy="schema-description"
      />
      <StringListFieldTableRow
        direction="column"
        name="References"
        values={schema.references}
        valuesDataCy="schema-references"
      />
      <StringFieldTableRow
        name="Version"
        value={schema.version}
        valueDataCy="schema-version"
      />
    </TableBody>
  </Table>
);
