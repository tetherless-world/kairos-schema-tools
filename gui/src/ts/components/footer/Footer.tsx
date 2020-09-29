import * as React from "react";
import {makeStyles} from "@material-ui/core";
import {Hrefs} from "Hrefs";

const useStyles = makeStyles((theme) => ({
  footerParagraph: {
    textAlign: "center",
  },
}));

export const Footer: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <footer>
      <p className={classes.footerParagraph}>
        This work is supported by the{" "}
        <a href="https://www.darpa.mil/program/knowledge-directed-artificial-intelligence-reasoning-over-schemas">
          DARPA KAIROS
        </a>{" "}
        program.
      </p>
    </footer>
  );
};
