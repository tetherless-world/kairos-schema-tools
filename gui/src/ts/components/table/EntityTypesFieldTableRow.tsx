import * as React from "react";
import {Grid, TableCell, TableRow} from "@material-ui/core";
import {EntityTypesFragment} from "api/queries/types/EntityTypesFragment";

export const EntityTypesFieldTableRow: React.FunctionComponent<{
  entityTypes: EntityTypesFragment | null;
}> = ({entityTypes}) => {
  if (!entityTypes || entityTypes.entityTypes.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>
        {entityTypes.and ? "Entity types (AND)" : "Entity types (OR)"}
      </TableCell>
      <TableCell>
        <Grid container direction="row" spacing={4}>
          {entityTypes.entityTypes.map((value) => (
            <Grid item key={value}>
              {value}
            </Grid>
          ))}
        </Grid>
      </TableCell>
    </TableRow>
  );
};
