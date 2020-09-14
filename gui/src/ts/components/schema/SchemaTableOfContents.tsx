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

interface SchemaTableOfContentsSlot extends SchemaTableOfContentsEntry {}

interface SchemaTableOfContentsStep extends SchemaTableOfContentsEntry {
  participants: readonly SchemaTableOfContentsStepParticipant[] | null;
}

interface SchemaTableOfContentsStepParticipant
  extends SchemaTableOfContentsEntry {}

export const SchemaTableOfContents: React.FunctionComponent<{
  addStep?: () => void;
  hrefs: SchemaHrefs;
  includeSourceLinks?: boolean;
  schema: {
    id: string;
    slots: readonly SchemaTableOfContentsSlot[];
    path: DefinitionPath;
    steps: {
      list: readonly SchemaTableOfContentsStep[];
    };
  };
}> = ({addStep, hrefs, includeSourceLinks, schema}) => {
  const classes = useStyles();

  const SlotsList: React.FunctionComponent<{
    slots: readonly SchemaTableOfContentsSlot[];
  }> = ({slots}) => (
    <List component="div" disablePadding>
      {slots.map((slot) => (
        <ListItem className={classes.nestedListItem} key={slot.id}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} style={{alignItems: "center"}}>
              <Grid item>
                <Link to={hrefs.slot({id: slot.id})}>Slot: {slot.label}</Link>
              </Grid>
              {includeSourceLinks ? (
                <Grid item>
                  <SdfDocumentSourceLink to={slot.path} />
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  const StepParticipantsList: React.FunctionComponent<{
    participants: readonly SchemaTableOfContentsStepParticipant[];
    stepId: string;
  }> = ({participants, stepId}) => (
    <List component="div" disablePadding>
      {participants.map((participant) => (
        <ListItem
          component="div"
          className={classes.nestedListItem}
          key={participant.id}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} style={{alignItems: "center"}}>
              <Grid item>
                <Link to={hrefs.stepParticipant(participant)}>
                  Participant: {participant.label}
                </Link>
              </Grid>
              {includeSourceLinks ? (
                <Grid item>
                  <SdfDocumentSourceLink to={participant.path} />
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  const StepsList: React.FunctionComponent<{
    steps: readonly SchemaTableOfContentsStep[];
  }> = ({steps}) => (
    <List component="div" disablePadding>
      {schema.steps.list.map((step) => (
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
                  <StepParticipantsList
                    participants={step.participants}
                    stepId={step.id}
                  />
                </Grid>
              ) : null}
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return (
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
          {schemaSection.id === "slots" ? (
            <SlotsList slots={schema.slots} />
          ) : null}
          {schemaSection.id === "steps" ? (
            <StepsList steps={schema.steps.list} />
          ) : null}
        </React.Fragment>
      ))}
    </List>
  );
};
