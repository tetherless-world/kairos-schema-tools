import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {schemaSections} from "models/schema/schemaSections";
import * as React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import {Link} from "components/link/Link";
import WorkIcon from "@material-ui/icons/Work";
import {makeStyles} from "@material-ui/core/styles";
import {SchemaHrefs} from "Hrefs";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPath} from "models/definition/DefinitionPath";

const useStyles = makeStyles((theme) => ({
  nestedListItem: {
    paddingLeft: theme.spacing(4),
  },
}));

interface SchemaTableOfContentsEntry {
  id: string;
  label: string;
  path: DefinitionPath;
}

interface SchemaTableOfContentsProvenanceDataObject
  extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsSlot extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsStep extends SchemaTableOfContentsEntry {
  participants: readonly SchemaTableOfContentsStepParticipant[] | null;
}

interface SchemaTableOfContentsStepParticipant
  extends SchemaTableOfContentsEntry {}

const SchemaTableOfContentsEntryList: React.FunctionComponent<{
  entries: readonly SchemaTableOfContentsEntry[];
  entryHref: (entry: SchemaTableOfContentsEntry) => string;
  includeSourceLinks?: boolean;
  labelPrefix: string;
}> = ({entries, entryHref, includeSourceLinks, labelPrefix}) => {
  const classes = useStyles();
  return (
    <List component="div" disablePadding>
      {entries.map((entry) => (
        <ListItem className={classes.nestedListItem} key={entry.id}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} style={{alignItems: "center"}}>
              <Grid item>
                <Link to={entryHref(entry)}>
                  {labelPrefix}: {entry.label}
                </Link>
              </Grid>
              {includeSourceLinks ? (
                <Grid item>
                  <SdfDocumentSourceLink to={entry.path} />
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

const StepsList: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  includeSourceLinks?: boolean;
  steps: readonly SchemaTableOfContentsStep[];
}> = ({hrefs, includeSourceLinks, steps}) => {
  const classes = useStyles();
  return (
    <List component="div" disablePadding>
      {steps.map((step) => (
        <ListItem className={classes.nestedListItem} key={step.id}>
          <ListItemText>
            <Grid container direction="column">
              <Grid item>
                <Grid container spacing={2} style={{alignItems: "center"}}>
                  <Grid item>
                    <Link to={hrefs.step({id: step.id})}>
                      Step: {step.label}
                    </Link>
                  </Grid>
                  {includeSourceLinks ? (
                    <Grid item>
                      <SdfDocumentSourceLink to={step.path} />
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              {step.participants ? (
                <Grid item>
                  <SchemaTableOfContentsEntryList
                    entries={step.participants}
                    entryHref={(entry) => hrefs.stepParticipant(entry)}
                    includeSourceLinks={includeSourceLinks}
                    labelPrefix="Participant"
                  />
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export const SchemaTableOfContents: React.FunctionComponent<{
  addStep?: () => void;
  hrefs: SchemaHrefs;
  includeSourceLinks?: boolean;
  schema: {
    id: string;
    provenanceData: readonly SchemaTableOfContentsProvenanceDataObject[] | null;
    slots: readonly SchemaTableOfContentsSlot[];
    path: DefinitionPath;
    steps: {
      list: readonly SchemaTableOfContentsStep[];
    };
  };
}> = ({addStep, hrefs, includeSourceLinks, schema}) => (
  <List data-cy="schema-toc">
    {schemaSections.map((schemaSection) => (
      <React.Fragment key={schemaSection.id}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>
            <Grid container>
              <Grid item style={{flexGrow: 1}}>
                <Link
                  dataCy={`schema-toc-${schemaSection.id}-link`}
                  to={hrefs.section(schemaSection.id)}
                >
                  {schemaSection.title}
                </Link>
              </Grid>
              {addStep && schemaSection.id === "steps" ? (
                <Grid item>
                  <Button
                    color="secondary"
                    onClick={addStep}
                    variant="contained"
                  >
                    Add step
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
        {schemaSection.id === "provenance-data" && schema.provenanceData ? (
          <SchemaTableOfContentsEntryList
            entries={schema.provenanceData}
            entryHref={(entry) => hrefs.provenanceDataObject(entry)}
            includeSourceLinks={includeSourceLinks}
            labelPrefix="Provenance data object"
          />
        ) : null}
        {schemaSection.id === "slots" ? (
          <SchemaTableOfContentsEntryList
            entries={schema.slots}
            entryHref={(entry) => hrefs.slot(entry)}
            includeSourceLinks={includeSourceLinks}
            labelPrefix="Slot"
          />
        ) : null}
        {schemaSection.id === "steps" ? (
          <StepsList
            hrefs={hrefs}
            includeSourceLinks={includeSourceLinks}
            steps={schema.steps.list}
          />
        ) : null}
      </React.Fragment>
    ))}
  </List>
);
