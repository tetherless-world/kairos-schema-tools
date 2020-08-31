import {SchemaPageQuery_schemaById_steps_participants} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import {StepParticipantDetailsTable} from "components/schema/StepParticipantDetailsTable";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";

export const StepParticipantCard: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  participant: SchemaPageQuery_schemaById_steps_participants;
}> = ({namespacePrefixes, participant}) => (
  <Card>
    <CardHeader title={"Participant: " + participant.label} />
    <CardContent>
      <StepParticipantDetailsTable
        namespacePrefixes={namespacePrefixes}
        participant={participant}
      />
    </CardContent>
  </Card>
);
