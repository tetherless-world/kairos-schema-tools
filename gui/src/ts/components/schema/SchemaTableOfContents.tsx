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
  path?: DefinitionPath;
}

interface SchemaTableOfContentsEntity extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsProvenanceDataObject
  extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsSlot extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsStep extends SchemaTableOfContentsEntry {
  participants: readonly SchemaTableOfContentsParticipant[] | null;
  temporalObjects: readonly {label: string}[] | null;
}

interface SchemaTableOfContentsStepOrder {
  id: string | null;
  label: string;
}

interface SchemaTableOfContentsParticipant extends SchemaTableOfContentsEntry {}

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
              {includeSourceLinks && entry.path ? (
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
        <ListItem
          className={classes.nestedListItem}
          component="div"
          key={step.id}
        >
          <ListItemText>
            <Grid container direction="column">
              <Grid item>
                <Grid container spacing={2} style={{alignItems: "center"}}>
                  <Grid item>
                    <Link to={hrefs.step({id: step.id})}>
                      Step: {step.label}
                    </Link>
                  </Grid>
                  {includeSourceLinks && step.path ? (
                    <Grid item>
                      <SdfDocumentSourceLink to={step.path} />
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              {step.participants && step.participants.length > 0 ? (
                <Grid item>
                  <SchemaTableOfContentsEntryList
                    entries={step.participants}
                    entryHref={(entry) => hrefs.participant(entry)}
                    includeSourceLinks={includeSourceLinks}
                    labelPrefix="Participant"
                  />
                </Grid>
              ) : null}
              {step.temporalObjects && step.temporalObjects.length > 0 ? (
                <Grid item>
                  <Link to={hrefs.stepTemporalObjects(step)}>
                    Temporal objects
                  </Link>
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
    entities: readonly SchemaTableOfContentsEntity[] | null;
    id: string;
    order: readonly SchemaTableOfContentsStepOrder[];
    path: DefinitionPath;
    provenanceData: readonly SchemaTableOfContentsProvenanceDataObject[] | null;
    slots: readonly SchemaTableOfContentsSlot[];
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
        {schemaSection.id === "entities" && schema.entities ? (
          <SchemaTableOfContentsEntryList
            entries={schema.entities}
            entryHref={(entry) => hrefs.entity(entry)}
            includeSourceLinks={includeSourceLinks}
            labelPrefix="Entity"
          />
        ) : null}
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
        {schemaSection.id === "step-order" &&
        schema.order.every((order) => !!order.id) ? (
          <SchemaTableOfContentsEntryList
            entries={schema.order.map((order) => ({
              id: order.id!,
              label: order.label,
            }))}
            entryHref={(entry) => hrefs.stepOrder(entry)}
            labelPrefix="Step order"
          />
        ) : null}
      </React.Fragment>
    ))}
  </List>
);
