import * as React from "react";
import {TableCell, TableRow} from "@material-ui/core";

export const StringFieldTableRow: React.FunctionComponent<{
  name: string;
  value: string | null;
  valueDataCy?: string;
}> = ({name, value, valueDataCy}) => {
  if (!value) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell data-cy={valueDataCy}>{value}</TableCell>
    </TableRow>
  );
};
