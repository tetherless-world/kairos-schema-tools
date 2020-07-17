import {SchemaPageQuery_schemaById_steps_participants} from "api/queries/types/SchemaPageQuery";
import {Table} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import * as React from "react";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const StepParticipantTable: React.FunctionComponent<{
  participant: SchemaPageQuery_schemaById_steps_participants;
}> = ({participant}) => (
  <Table>
    <StringFieldTableRow
      name="Name"
      value={participant.name}
      valueDataCy="step-participant-name"
    />
    <StringFieldTableRow
      name="Identifier"
      value={participant.id}
      valueDataCy="step-participant-id"
    />
    <StringFieldTableRow
      name="Role"
      value={participant.role}
      valueDataCy="step-participant-role"
    />
    <StringListFieldTableRow
      name="Entity types"
      values={participant.entityTypes}
      valuesDataCy="step-participant-entity-types"
    />
  </Table>
);
