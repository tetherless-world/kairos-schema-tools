import {
  SchemaPageQuery_schemaById_provenanceData,
  SchemaPageQuery_schemaById_steps_list,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {StepParticipantCard} from "components/schema/StepParticipantCard";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {TemporalObjectCard} from "components/schema/TemporalObjectCard";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";

export const StepCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  step: SchemaPageQuery_schemaById_steps_list;
}> = ({hrefs, namespacePrefixes, provenanceData, step}) => (
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
            value={shortenUri({namespacePrefixes, uri: step.id})}
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
          <StringFieldTableRow
            name="Confidence"
            value={step.confidence?.toFixed(2)}
            valueDataCy="step-confidence"
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
            value={step.maxDuration?.string}
            valueDataCy="step-max-duration"
          />
          <StringFieldTableRow
            name="Min duration"
            value={step.minDuration?.string}
            valueDataCy="step-min-duration"
          />
          <JsonFieldTableRow name={"Private data"} value={step.privateData} />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={provenanceData}
            provenances={step.provenances}
          />
          <StringListFieldTableRow
            direction="column"
            name="References"
            values={
              step.references
                ? step.references.map((reference) =>
                    shortenUri({namespacePrefixes, uri: reference})
                  )
                : null
            }
            valuesDataCy="step-references"
          />
          <StringFieldTableRow
            name="TA1 reference"
            value={
              step.ta1ref
                ? shortenUri({namespacePrefixes, uri: step.ta1ref})
                : null
            }
            valueDataCy="step-ta1ref"
          />
          <StringFieldTableRow
            name="Type"
            value={shortenUri({namespacePrefixes, uri: step.type})}
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
                  item
                  key={participant.id}
                >
                  <StepParticipantCard
                    hrefs={hrefs}
                    namespacePrefixes={namespacePrefixes}
                    participant={participant}
                    provenanceData={provenanceData}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : null}
      {step.temporalObjects && step.temporalObjects.length > 0 ? (
        <Card>
          <CardHeader title="Temporal objects" />
          <CardContent>
            <Grid
              container
              direction="column"
              id={hrefs.stepTemporalObjectsId(step)}
              spacing={6}
            >
              {step.temporalObjects.map(
                (temporalObject, temporalObjectIndex) => (
                  <Grid item key={temporalObjectIndex}>
                    <TemporalObjectCard
                      hrefs={hrefs}
                      provenanceData={provenanceData}
                      temporalObject={temporalObject}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </CardContent>
  </Card>
);
