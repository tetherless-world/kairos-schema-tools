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

  const navLinks: {
    readonly dataCy: string;
    readonly href: string;
    readonly label: string;
  }[] = [
    {
      dataCy: "schemas-nav-link",
      href: Hrefs.schemas.toString(),
      label: "Schemas",
    },
    {
      dataCy: "sdf-documents-nav-link",
      href: Hrefs.sdfDocuments.toString(),
      label: "SDF Documents",
    },
  ];

  return (
    <AppBar className={classes.navbar} position="static" data-cy="navbar">
      <Toolbar>
        <Button
          component={Link}
          to={Hrefs.home}
          className={classes.brand}
          data-cy="brand-link"
        >
          <Typography variant="h5">KAIROS schema tools</Typography>
        </Button>
        {navLinks.map((navLink) => (
          <Button
            data-cy={navLink.dataCy}
            key={navLink.href}
            component={Link}
            to={navLink.href}
            className={classes.navButton}
          >
            {navLink.label}
          </Button>
        ))}
        <div className={classes.searchFormSpacer} />
        <NavbarSearchForm onSearch={onSearch} />
      </Toolbar>
    </AppBar>
  );
};
