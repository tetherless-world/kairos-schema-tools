import * as React from "react";
import {Redirect} from "react-router-dom";

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
import {NavbarSearchForm} from "components/navbar/NavbarSearchForm";

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
    },
    searchFormSpacer: {
      marginLeft: theme.spacing(4),
    },
  })
);

export const Navbar: React.FunctionComponent<{
  onSearch?: (text: string) => void;
}> = ({onSearch: onSearchUserDefined}) => {
  const classes = useStyles();

  const [redirectToSearchText, setRedirectToSearchText] = React.useState<
    string | null
  >(null);

  let onSearch: (text: string) => void;
  if (onSearchUserDefined) {
    onSearch = onSearchUserDefined;
  } else {
    onSearch = setRedirectToSearchText;

    if (redirectToSearchText) {
      return <Redirect to={Hrefs.search({query: redirectToSearchText})} />;
    }
  }

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
        <div className={classes.searchFormSpacer} />
        <NavbarSearchForm onSearch={onSearch} />
      </Toolbar>
    </AppBar>
  );
};
