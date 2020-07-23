import {SchemaPageQuery_schemaById_steps} from "api/queries/types/SchemaPageQuery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import {StepDetailsTable} from "components/schema/StepDetailsTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {StepParticipantDetailsTable} from "components/schema/StepParticipantDetailsTable";
import * as React from "react";

export const StepCard: React.FunctionComponent<{
  step: SchemaPageQuery_schemaById_steps;
}> = ({step}) => (
  <Card>
    <CardHeader title={"Step: " + step.name} />
    <CardContent>
      <StepDetailsTable step={step} />
      {step.participants && step.participants.length > 0 ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Participants
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" spacing={6}>
              {step.participants.map((participant) => (
                <Grid item>
                  <StepParticipantDetailsTable participant={participant} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </CardContent>
  </Card>
);
