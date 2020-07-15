import {Grid, Typography} from "@material-ui/core";
import * as React from "react";

export const StandardLayout: React.FunctionComponent<React.PropsWithChildren<{
  subtitle?: string;
  title: string;
}>> = ({children, subtitle, title}) => (
  <Grid container justify="center">
    <Grid item>
      <Grid container direction="column" spacing={4}>
        <Grid item container direction="column">
          <Grid item>
            <Typography
              data-cy="standard-layout-title"
              variant="h4"
              style={{textAlign: "center"}}
            >
              {title}
            </Typography>
          </Grid>
          {subtitle ? (
            <Grid item>
              <Typography
                data-cy="standard-layout-subtitle"
                variant="h5"
                style={{textAlign: "center"}}
              >
                {subtitle}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid item container>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
