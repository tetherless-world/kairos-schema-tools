import * as React from "react";
import {Link as MuiLink} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {PropsWithChildren} from "react";

export const Link: React.FunctionComponent<PropsWithChildren<{
  color?:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error"
    | undefined;
  dataCy?: string;
  to: string;
}>> = ({children, color, dataCy, to}) => (
  <MuiLink color={color} component={RouterLink} data-cy={dataCy} to={to}>
    {children}
  </MuiLink>
);
