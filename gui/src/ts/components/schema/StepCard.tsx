import {SchemaPageQuery_schemaById_steps} from "api/queries/types/SchemaPageQuery";
import {Card, CardContent, CardHeader, Grid, Table, TableBody} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {StepParticipantCard} from "components/schema/StepParticipantCard";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const StepCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  step: SchemaPageQuery_schemaById_steps;
}> = ({hrefs, step}) => (
  <Card>
    <CardHeader title={"Step: " + step.label} />
    <CardContent>
      <Table data-cy={"step-" + step.id}>
        <TableBody>
          <StringFieldTableRow
            name="Name"
            value={step.name}
            valueDataCy="step-name"
          />
          <StringFieldTableRow
            name="Identifier"
            value={step.id}
            valueDataCy="step-id"
          />
          <StringListFieldTableRow
            direction="column"
            name="Also known as"
            values={step.aka}
            valuesDataCy="step-aka"
          />
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={step.comments}
            valuesDataCy="step-comments"
          />
          <StringListFieldTableRow
            direction="column"
            name="Achieves"
            values={step.achieves}
          />
          <StringListFieldTableRow
            direction="column"
            name="Requires"
            values={step.requires}
          />
          <StringFieldTableRow
            name="Max duration"
            value={step.maxDuration ? step.maxDuration.string : null}
            valueDataCy="step-max-duration"
          />
          <StringFieldTableRow
            name="Min duration"
            value={step.minDuration ? step.minDuration.string : null}
            valueDataCy="step-min-duration"
          />
          <StringListFieldTableRow
            direction="column"
            name="Provenance"
            values={step.provenances}
            valuesDataCy="step-provenances"
          />
          <StringListFieldTableRow
            direction="column"
            name="References"
            values={step.references}
            valuesDataCy="step-references"
          />
          <StringFieldTableRow
            name="Type"
            value={step.type}
            valueDataCy="step-type"
          />
        </TableBody>
      </Table>
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
