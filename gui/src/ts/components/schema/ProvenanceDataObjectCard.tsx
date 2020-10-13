import {SchemaPageQuery_schemaById_provenanceData} from "api/queries/types/SchemaPageQuery";
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
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";

export const ProvenanceDataObjectCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenanceDataObject: SchemaPageQuery_schemaById_provenanceData;
}> = ({hrefs, provenanceDataObject}) => (
  <Card>
    <CardHeader
      title={"Provenance data object: " + provenanceDataObject.label}
    />
    <CardContent>
      <Table data-cy={"provenance-data-object-" + provenanceDataObject.id}>
        <TableBody>
          <StringFieldTableRow
            name="Identifier"
            value={provenanceDataObject.id}
          />
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={provenanceDataObject.comments}
          />
          <StringFieldTableRow
            name="Child ID"
            value={provenanceDataObject.childId}
          />
          <StringListFieldTableRow
            direction="row"
            name="Parent IDs"
            values={provenanceDataObject.parentIds}
          />
          <StringFieldTableRow
            name="Start time"
            value={
              provenanceDataObject.startTime != null
                ? provenanceDataObject.startTime.toFixed(2)
                : null
            }
          />
          <StringFieldTableRow
            name="End time"
            value={
              provenanceDataObject.endTime != null
                ? provenanceDataObject.endTime.toFixed(2)
                : null
            }
          />
          <StringListFieldTableRow
            direction="row"
            name="Bounding box"
            values={
              provenanceDataObject.boundingBox
                ? provenanceDataObject.boundingBox.map((value) =>
                    value.toString()
                  )
                : null
            }
          />
          <StringListFieldTableRow
            direction="row"
            name="Keyframes"
            values={
              provenanceDataObject.keyframes
                ? provenanceDataObject.keyframes.map((value) =>
                    value.toString()
                  )
                : null
            }
          />
          <StringFieldTableRow
            name="Length"
            value={
              provenanceDataObject.length
                ? provenanceDataObject.length.toString()
                : null
            }
          />
          <StringFieldTableRow
            name="Offset"
            value={
              provenanceDataObject.offset
                ? provenanceDataObject.offset.toString()
                : null
            }
          />
          <StringFieldTableRow
            name="Media type"
            value={provenanceDataObject.mediaType}
          />
          <JsonFieldTableRow
            name={"Private data"}
            value={provenanceDataObject.privateData}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
