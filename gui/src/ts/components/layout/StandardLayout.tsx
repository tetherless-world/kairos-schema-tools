import {Grid, Typography} from "@material-ui/core";
import * as React from "react";

export const StandardLayout: React.FunctionComponent<React.PropsWithChildren<{
  title: string;
}>> = ({children, title}) => (
  <Grid container justify="center">
    <Grid item>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" style={{textAlign: "center"}}>
            {title}
          </Typography>
        </Grid>
        <Grid item container>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
