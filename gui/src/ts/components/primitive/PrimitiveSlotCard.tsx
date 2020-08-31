import {PrimitivePageQuery_primitiveById_slots} from "api/queries/types/PrimitivePageQuery";
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

export const PrimitiveSlotCard: React.FunctionComponent<{
  slot: PrimitivePageQuery_primitiveById_slots;
}> = ({slot}) => (
  <Card>
    <CardHeader
      title={
        "Slot: " +
        shortenUri({
          namespacePrefixes: slot.path.sdfDocument.namespacePrefixes,
          uri: slot.id,
        })
      }
    />
    <CardContent>
      <Table>
        <TableBody>
          <StringFieldTableRow name="Identifier" value={slot.id} />
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
          <StringListFieldTableRow
            direction="row"
            name="Entity types"
            values={slot.entityTypes}
          />
          <StringListFieldTableRow
            direction="column"
            name="References"
            values={slot.references}
          />
          <StringFieldTableRow name="Role name" value={slot.roleName} />
          <StringFieldTableRow
            name="Super"
            value={shortenUri({
              namespacePrefixes: slot.path.sdfDocument.namespacePrefixes,
              uri: slot.super,
            })}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
