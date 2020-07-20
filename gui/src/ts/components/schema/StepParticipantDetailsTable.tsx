import {SchemaPageQuery_schemaById_steps_participants} from "api/queries/types/SchemaPageQuery";
import {Table, TableBody} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import * as React from "react";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const StepParticipantDetailsTable: React.FunctionComponent<{
  participant: SchemaPageQuery_schemaById_steps_participants;
}> = ({participant}) => (
  <Table>
    <TableBody>
      <StringFieldTableRow name="Identifier" value={participant.id} />
      <StringFieldTableRow
        name="Name"
        value={participant.name}
        valueDataCy="step-participant-name"
      />
      <StringListFieldTableRow
        direction="column"
        name="Also known as"
        values={participant.aka}
      />
      <StringListFieldTableRow
        direction="column"
        name="Comments"
        values={participant.comments}
      />
      <StringListFieldTableRow
        direction="row"
        name="Entity types"
        values={participant.entityTypes}
      />
      <StringListFieldTableRow
        direction="column"
        name="References"
        values={participant.references}
      />
      <StringFieldTableRow name="Refvar" value={participant.refvar} />
      <StringFieldTableRow name="Role" value={participant.role} />
    </TableBody>
  </Table>
);
