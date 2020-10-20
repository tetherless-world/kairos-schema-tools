import * as React from "react";
import {List, ListItemText, TableCell, TableRow} from "@material-ui/core";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";

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
              <Link to={hrefs.provenanceDataObject({id: provenance})}>
                {provenance}
              </Link>
            </ListItemText>
          ))}
        </List>
      </TableCell>
    </TableRow>
  );
};
