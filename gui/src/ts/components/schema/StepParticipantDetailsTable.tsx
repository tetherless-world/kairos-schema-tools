import {SchemaPageQuery_schemaById_steps_participants} from "api/queries/types/SchemaPageQuery";
import {Table, TableBody} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import * as React from "react";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";

export const StepParticipantDetailsTable: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  participant: SchemaPageQuery_schemaById_steps_participants;
}> = ({namespacePrefixes, participant}) => (
  <Table>
    <TableBody>
      <StringFieldTableRow
        name="Identifier"
        value={shortenUri({namespacePrefixes, uri: participant.id})}
      />
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
        values={
          participant.references
            ? participant.references.map((reference) =>
                shortenUri({namespacePrefixes, uri: reference})
              )
            : null
        }
      />
      <StringFieldTableRow name="Refvar" value={participant.refvar} />
      <StringFieldTableRow
        name="Role"
        value={shortenUri({namespacePrefixes, uri: participant.role})}
      />
    </TableBody>
  </Table>
);
