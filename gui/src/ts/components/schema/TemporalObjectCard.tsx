import {
  SchemaPageQuery_schemaById_provenanceData,
  SchemaPageQuery_schemaById_steps_list_temporalObjects,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";

export const TemporalObjectCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  temporalObject: SchemaPageQuery_schemaById_steps_list_temporalObjects;
}> = ({hrefs, provenanceData, temporalObject}) => (
  <Card>
    <CardHeader title={"Temporal object: " + temporalObject.label} />
    <CardContent>
      <Table>
        <TableBody>
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={temporalObject.comments}
          />
          <StringFieldTableRow
            name="Confidence"
            value={temporalObject.confidence.toFixed(2)}
          />
          <StringFieldTableRow
            name="Earliest start time"
            value={temporalObject.earliestStartTime?.string}
          />
          <StringFieldTableRow
            name="Latest start time"
            value={temporalObject.latestStartTime?.string}
          />
          <StringFieldTableRow
            name="Earliest end time"
            value={temporalObject.earliestEndTime?.string}
          />
          <StringFieldTableRow
            name="Latest end time"
            value={temporalObject.latestEndTime?.string}
          />
          <StringFieldTableRow
            name="Duration"
            value={temporalObject.duration?.string}
          />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={provenanceData}
            provenances={temporalObject.provenances}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
