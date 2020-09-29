import {SchemaPageQuery_schemaById_slots} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import * as React from "react";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {shortenUri} from "models/shortenUri";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {EntityTypesFieldTableRow} from "components/table/EntityTypesFieldTableRow";

export const SchemaSlotCard: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  slot: SchemaPageQuery_schemaById_slots;
}> = ({namespacePrefixes, slot}) => (
  <Card>
    <CardHeader
      title={"Slot: " + shortenUri({namespacePrefixes, uri: slot.id})}
    />
    <CardContent>
      <Table>
        <TableBody>
          <StringFieldTableRow
            name="Identifier"
            value={shortenUri({namespacePrefixes, uri: slot.id})}
          />
          <StringListFieldTableRow
            direction="column"
            name="Also known as"
            values={slot.aka}
          />
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={slot.comments}
          />
          <EntityTypesFieldTableRow entityTypes={slot.entityTypes} />
          <JsonFieldTableRow name={"Private data"} value={slot.privateData} />
          <StringListFieldTableRow
            direction="column"
            name="References"
            values={
              slot.references
                ? slot.references.map((reference) =>
                    shortenUri({namespacePrefixes, uri: reference})
                  )
                : null
            }
          />
          <StringFieldTableRow name="Refvar" value={slot.refvar} />
          <StringFieldTableRow name="Role name" value={slot.roleName} />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
