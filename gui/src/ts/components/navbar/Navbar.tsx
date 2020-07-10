import * as React from "react";

import {
  Typography,
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Button,
} from "@material-ui/core";

import {Hrefs} from "Hrefs";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    navbar: {
      zIndex: 0, // Override z-index so search autcomplete will be on top navbar
    },
    brand: {
      marginRight: theme.spacing(2),
      color: theme.palette.primary.contrastText,
    },
    navButton: {
      color: theme.palette.primary.contrastText,
    }
  })
);

export const Navbar: React.FunctionComponent<{}> = () => {
  const classes = useStyles();

  const topLevelPaths: {
      readonly path: string;
      readonly label: string;
  }[] = [
    {path: Hrefs.schemas.toString(), label: "Schemas"},
    {path: Hrefs.sdfDocuments.toString(), label: "SDF Documents"},
  ];

  return (
    <AppBar className={classes.navbar} position="static" data-cy="naVbar">
      <Toolbar>
        <Button component={Link} to={Hrefs.home} className={classes.brand}>
          <Typography variant="h5">KAIROS schema tools</Typography>
        </Button>
        {topLevelPaths.map((tlp) => (
          <Button
            key={tlp.path}
            component={Link}
            to={tlp.path}
            className={classes.navButton}
          >
            {tlp.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};
