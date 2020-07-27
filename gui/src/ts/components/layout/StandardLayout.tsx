import {Grid, Typography} from "@material-ui/core";
import * as React from "react";
import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Breadcrumbs} from "components/breadcrumbs/Breadcrumbs";
import {CSSProperties} from "@material-ui/core/styles/withStyles";

export const StandardLayout: React.FunctionComponent<React.PropsWithChildren<{
  breadcrumbs?: BreadcrumbsProps;
  flexGrow?: number;
  rowItemStyle?: CSSProperties;
  subtitle?: string;
  title: React.ReactNode;
}>> = ({breadcrumbs, children, rowItemStyle, subtitle, title}) => (
  <Grid container data-cy="standard-layout" direction="column" spacing={4}>
    {breadcrumbs ? (
      <Grid item>
        <Breadcrumbs {...breadcrumbs} />
      </Grid>
    ) : null}
    <Grid item container justify="center">
      <Grid item style={rowItemStyle}>
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
                  variant="h6"
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
  </Grid>
);
