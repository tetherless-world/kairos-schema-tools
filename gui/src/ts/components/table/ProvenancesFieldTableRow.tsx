import * as React from "react";
import {List, ListItemText, TableCell, TableRow} from "@material-ui/core";
import {SchemaHrefs} from "Hrefs";
import {ProvenanceLink} from "components/link/ProvenanceLink";

export const ProvenancesFieldTableRow: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenances: readonly string[] | null;
}> = ({hrefs, provenances}) => {
  if (!provenances || provenances.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>Provenance</TableCell>
      <TableCell>
        <List>
          {provenances.map((provenance) => (
            <ListItemText key={provenance}>
              <ProvenanceLink hrefs={hrefs} provenance={provenance} />
            </ListItemText>
          ))}
        </List>
      </TableCell>
    </TableRow>
  );
};
