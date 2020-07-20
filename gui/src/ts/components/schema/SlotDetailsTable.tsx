import {SchemaPageQuery_schemaById_slots} from "api/queries/types/SchemaPageQuery";
import {Table, TableBody} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import * as React from "react";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const SlotDetailsTable: React.FunctionComponent<{
  slot: SchemaPageQuery_schemaById_slots;
}> = ({slot}) => (
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
);
