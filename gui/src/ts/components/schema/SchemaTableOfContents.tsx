import {
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

const useStyles = makeStyles((theme) => ({
  nestedListItem: {
    paddingLeft: theme.spacing(4),
  },
}));

interface SchemaTableOfContentsSlot {
  id: string;
  roleName: string;
}

interface SchemaTableOfContentsStep {
  id: string;
  name: string;
  participants: readonly SchemaTableOfContentsStepParticipant[] | null;
}

interface SchemaTableOfContentsStepParticipant {
  id: string;
  name: string;
}

export const SchemaTableOfContents: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  includeSourceLinks?: boolean;
  schema: {
    id: string;
    slots: readonly SchemaTableOfContentsSlot[];
    sdfDocumentId: string;
    steps: readonly SchemaTableOfContentsStep[];
  };
}> = ({hrefs, includeSourceLinks, schema}) => {
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
                <Link to={hrefs.slot({id: slot.id})}>
                  Slot: {slot.roleName}
                </Link>
              </Grid>
              {includeSourceLinks ? (
                <Grid item>
                  <SdfDocumentSourceLink
                    to={{
                      schemaId: schema.id,
                      sdfDocumentId: schema.sdfDocumentId,
                      slotId: slot.id,
                    }}
                  />
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
        <ListItem className={classes.nestedListItem} key={participant.id}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} style={{alignItems: "center"}}>
              <Grid item>
                <Link to={hrefs.step({id: stepId})}>
                  Participant: {participant.name}
                </Link>
              </Grid>
              {includeSourceLinks ? (
                <Grid item>
                  <SdfDocumentSourceLink
                    to={{
                      schemaId: schema.id,
                      sdfDocumentId: schema.sdfDocumentId,
                      stepId: stepId,
                      stepParticipantId: participant.id,
                    }}
                  />
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
      {schema.steps.map((step) => (
        <ListItem className={classes.nestedListItem} key={step.id}>
          <ListItemText>
            <Grid container direction="column">
              <Grid item>
                <Grid container spacing={2} style={{alignItems: "center"}}>
                  <Grid item>
                    <Link to={hrefs.step({id: step.id})}>
                      Step: {step.name}
                    </Link>
                  </Grid>
                  {includeSourceLinks ? (
                    <Grid item>
                      <SdfDocumentSourceLink
                        to={{
                          schemaId: schema.id,
                          sdfDocumentId: schema.sdfDocumentId,
                          stepId: step.id,
                        }}
                      />
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
              <Link
                dataCy={`schema-toc-${schemaSection.id}-link`}
                to={hrefs.section(schemaSection.id)}
              >
                {schemaSection.title}
              </Link>
            </ListItemText>
          </ListItem>
          {schemaSection.id === "slots" ? (
            <SlotsList slots={schema.slots} />
          ) : null}
          {schemaSection.id === "steps" ? (
            <StepsList steps={schema.steps} />
          ) : null}
        </React.Fragment>
      ))}
    </List>
  );
};
