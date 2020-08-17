import {SchemaPageQuery_schemaById_steps} from "api/queries/types/SchemaPageQuery";
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import {StepDetailsTable} from "components/schema/StepDetailsTable";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {StepParticipantCard} from "components/schema/StepParticipantCard";

export const StepCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  step: SchemaPageQuery_schemaById_steps;
}> = ({hrefs, step}) => (
  <Card>
    <CardHeader title={"Step: " + step.label} />
    <CardContent>
      <StepDetailsTable step={step} />
      {step.participants && step.participants.length > 0 ? (
        <Card>
          <CardHeader title="Participants"></CardHeader>
          <CardContent>
            <Grid container direction="column" spacing={6}>
              {step.participants.map((participant) => (
                <Grid
                  id={hrefs.stepParticipantId(participant)}
                  key={participant.id}
                  item
                >
                  <StepParticipantCard participant={participant} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </CardContent>
  </Card>
);
