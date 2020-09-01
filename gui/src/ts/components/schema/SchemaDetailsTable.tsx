import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";

export const SchemaDetailsTable: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  schema: SchemaPageQuery_schemaById & {id: string};
}> = ({namespacePrefixes, schema}) => (
  <Table>
    <TableBody>
      <StringFieldTableRow
        name="Name"
        value={schema.name}
        valueDataCy="schema-name"
      />
      <StringFieldTableRow
        name="Identifier"
        value={shortenUri({namespacePrefixes, uri: schema.id})}
        valueDataCy="schema-id"
      />
      {/*{schema.super ? (*/}
      {/*  <TableRow>*/}
      {/*    <TableCell>Super</TableCell>*/}
      {/*    <TableCell data-cy="schema-super">*/}
      {/*      <Link*/}
      {/*        to={Hrefs.sdfDocuments*/}
      {/*          .sdfDocument({id: schema.sdfDocumentId})*/}
      {/*          .schemas.schema({id: schema.super})*/}
      {/*          .toString()}*/}
      {/*      >*/}
      {/*        {schema.super}*/}
      {/*      </Link>*/}
      {/*    </TableCell>*/}
      {/*  </TableRow>*/}
      {/*) : null}*/}
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
      <JsonFieldTableRow name={"Private data"} value={schema.privateData} />
      <StringListFieldTableRow
        direction="column"
        name="References"
        values={
          schema.references
            ? schema.references.map((reference) =>
                shortenUri({namespacePrefixes, uri: reference})
              )
            : null
        }
        valuesDataCy="schema-references"
      />
      <StringFieldTableRow
        name="Template"
        value={schema.template}
        valueDataCy="schema-template"
      />
      <StringFieldTableRow
        name="Version"
        value={schema.version}
        valueDataCy="schema-version"
      />
    </TableBody>
  </Table>
);
