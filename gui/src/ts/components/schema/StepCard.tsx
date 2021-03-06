import {
  SchemaPageQuery_schemaById,
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
import {ParticipantCard} from "components/schema/ParticipantCard";
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
  schema: SchemaPageQuery_schemaById;
  step: SchemaPageQuery_schemaById_steps_list;
}> = ({hrefs, namespacePrefixes, schema, step}) => (
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
          <StringListFieldTableRow
            direction="row"
            name="Modalities"
            values={step.modalities}
          />
          <JsonFieldTableRow name={"Private data"} value={step.privateData} />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={schema.provenanceData}
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
                  id={hrefs.participantId(participant)}
                  item
                  key={participant.id}
                >
                  <ParticipantCard
                    hrefs={hrefs}
                    namespacePrefixes={namespacePrefixes}
                    participant={participant}
                    schema={schema}
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
              id={hrefs.temporalObjectsId(step)}
              spacing={6}
            >
              {step.temporalObjects.map(
                (temporalObject, temporalObjectIndex) => (
                  <Grid item key={temporalObjectIndex}>
                    <TemporalObjectCard
                      hrefs={hrefs}
                      provenanceData={schema.provenanceData}
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
