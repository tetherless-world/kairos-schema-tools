import * as React from "react";
import {Grid, List, ListItemText, TableCell, TableRow} from "@material-ui/core";

export const StringListFieldTableRow: React.FunctionComponent<{
  direction: "column" | "row";
  name: string;
  values: string[] | null;
  valuesDataCy?: string;
}> = ({direction, name, values, valuesDataCy}) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell data-cy={valuesDataCy}>
        {direction === "column" ? (
          <List>
            {values.map((value) => (
              <ListItemText key={value}>{value}</ListItemText>
            ))}
          </List>
        ) : (
          <Grid container direction="row" spacing={4}>
            {values.map((value) => (
              <Grid item key={value}>
                {value}
              </Grid>
            ))}
          </Grid>
        )}
      </TableCell>
    </TableRow>
  );
};
