import {
  SchemaPageQuery_schemaById_provenanceData,
  SchemaPageQuery_schemaById_steps_list_participants_values,
} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {EntityTypesFieldTableRow} from "components/table/EntityTypesFieldTableRow";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";
import {SchemaHrefs} from "Hrefs";

export const StepParticipantValueCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  value: SchemaPageQuery_schemaById_steps_list_participants_values;
}> = ({hrefs, provenanceData, value}) => (
  <Card>
    <CardHeader title={"Value: " + value.label} />
    <CardContent>
      <Table>
        <TableBody>
          <StringFieldTableRow
            name="Name"
            value={value.name}
            valueDataCy="step-participant-name"
          />
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={value.comments}
          />
          <StringFieldTableRow
            name="Confidence"
            value={value.confidence ? value.confidence.toFixed(2) : null}
          />
          <EntityTypesFieldTableRow entityTypes={value.entityTypes} />
          <JsonFieldTableRow name={"Private data"} value={value.privateData} />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={provenanceData}
            provenances={value.provenances}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
