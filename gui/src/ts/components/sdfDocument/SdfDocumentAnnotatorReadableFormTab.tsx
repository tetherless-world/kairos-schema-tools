import * as React from "react";
import {Button, Grid} from "@material-ui/core";

export const SdfDocumentAnnotatorReadableFormTab: React.FunctionComponent<{
  annotatorReadableForm: string | null;
  getAnnotatatorReadableForm: () => void;
}> = ({annotatorReadableForm, getAnnotatatorReadableForm}) => (
  <Grid container>
    <Grid item xs={1} />
    <Grid item xs={11}>
      <Grid container direction="column" spacing={4}>
        <Grid item style={{minWidth: 0}}>
          {annotatorReadableForm != null ? (
            <pre
              style={{fontSize: "x-large", maxWidth: "100%", overflow: "auto"}}
            >
              {annotatorReadableForm}
            </pre>
          ) : (
            <h2>
              Click the Refresh button to update the annotator readable form.
            </h2>
          )}
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            onClick={getAnnotatatorReadableForm}
            size="large"
            variant="contained"
          >
            Refresh
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
