import * as React from "react";
import {PropsWithChildren} from "react";
import {Link as MuiLink} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

export const Link: React.FunctionComponent<PropsWithChildren<{
  color?: string;
  to: string;
}>> = ({children, color, to}) => (
  <MuiLink component={RouterLink} to={to}>
    {children}
  </MuiLink>
);
