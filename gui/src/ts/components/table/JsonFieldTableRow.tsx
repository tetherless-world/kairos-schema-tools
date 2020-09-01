import * as React from "react";
import {TableCell, TableRow} from "@material-ui/core";
import JSONPretty from "react-json-pretty";
const JSONPrettyTheme = require("react-json-pretty/dist/monikai");

export const JsonFieldTableRow: React.FunctionComponent<{
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
      <TableCell data-cy={valueDataCy}>
        <JSONPretty data={value} theme={JSONPrettyTheme} />
      </TableCell>
    </TableRow>
  );
};
