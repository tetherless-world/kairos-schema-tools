import {SchemaPageQuery_schemaById_steps_participants} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import {StepParticipantDetailsTable} from "components/schema/StepParticipantDetailsTable";

export const StepParticipantCard: React.FunctionComponent<{
  participant: SchemaPageQuery_schemaById_steps_participants;
}> = ({participant}) => (
  <Card>
    <CardHeader>{participant.label}</CardHeader>
    <CardContent>
      <StepParticipantDetailsTable participant={participant} />
    </CardContent>
  </Card>
);
