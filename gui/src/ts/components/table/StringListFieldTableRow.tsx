import * as React from "react";
import {List, ListItemText, TableCell, TableRow} from "@material-ui/core";

export const StringListFieldTableRow: React.FunctionComponent<{
  name: string;
  values: string[] | null;
  valuesDataCy?: string;
}> = ({name, values, valuesDataCy}) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell data-cy={valuesDataCy}>
        <List>
          {values.map((value) => (
            <ListItemText key={value}>{value}</ListItemText>
          ))}
        </List>
      </TableCell>
    </TableRow>
  );
};
