import {
  SchemaPageQuery_schemaById_provenanceData,
  SchemaPageQuery_schemaById_steps_list_participants,
} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
} from "@material-ui/core";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {shortenUri} from "models/shortenUri";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {EntityTypesFieldTableRow} from "components/table/EntityTypesFieldTableRow";
import {StepParticipantValueCard} from "components/schema/StepParticipantValueCard";
import {SchemaHrefs} from "Hrefs";

export const StepParticipantCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  participant: SchemaPageQuery_schemaById_steps_list_participants;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
}> = ({hrefs, namespacePrefixes, participant, provenanceData}) => (
  <Card>
    <CardHeader title={"Participant: " + participant.label} />
    <CardContent>
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
          <EntityTypesFieldTableRow entityTypes={participant.entityTypes} />
          <JsonFieldTableRow
            name={"Private data"}
            value={participant.privateData}
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
      {participant.values && participant.values.length > 0 ? (
        <Card>
          <CardHeader title="Values"></CardHeader>
          <CardContent>
            <Grid container direction="column" spacing={6}>
              {participant.values.map((value) => (
                <Grid key={value.label} item>
                  <StepParticipantValueCard
                    hrefs={hrefs}
                    provenanceData={provenanceData}
                    value={value}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </CardContent>
  </Card>
);
