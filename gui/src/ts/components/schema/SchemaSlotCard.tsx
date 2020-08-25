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

export const SchemaSlotCard: React.FunctionComponent<{
  slot: SchemaPageQuery_schemaById_slots;
}> = ({slot}) => (
  <Card>
    <CardHeader title={"Slot: " + slot.id} />
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
          <StringFieldTableRow name="Refvar" value={slot.refvar} />
          <StringFieldTableRow name="Role name" value={slot.roleName} />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
