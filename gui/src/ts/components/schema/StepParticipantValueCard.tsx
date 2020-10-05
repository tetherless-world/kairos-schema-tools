import {SchemaPageQuery_schemaById_steps_list_participants_values} from "api/queries/types/SchemaPageQuery";
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

export const StepParticipantValueCard: React.FunctionComponent<{
  value: SchemaPageQuery_schemaById_steps_list_participants_values;
}> = ({value}) => (
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
          <StringListFieldTableRow
            direction="column"
            name="Provenance"
            values={value.provenances}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
