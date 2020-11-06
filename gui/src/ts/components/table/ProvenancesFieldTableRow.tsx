import * as React from "react";
import {List, ListItemText, TableCell, TableRow} from "@material-ui/core";
import {SchemaHrefs} from "Hrefs";
import {ProvenanceLink} from "components/link/ProvenanceLink";
import {SchemaPageQuery_schemaById_provenanceData} from "api/queries/types/SchemaPageQuery";

export const ProvenancesFieldTableRow: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  name?: string;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  provenances: readonly string[] | null;
}> = ({hrefs, name, provenanceData, provenances}) => {
  if (!provenances || provenances.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{name ?? "Provenance"}</TableCell>
      <TableCell>
        <List>
          {provenances.map((provenance) => (
            <ListItemText key={provenance}>
              <ProvenanceLink
                hrefs={hrefs}
                provenance={provenance}
                provenanceData={provenanceData}
              />
            </ListItemText>
          ))}
        </List>
      </TableCell>
    </TableRow>
  );
};
