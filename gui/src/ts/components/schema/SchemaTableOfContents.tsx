import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {schemaSections} from "models/schema/schemaSections";
import * as React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import {Link} from "components/link/Link";
import WorkIcon from "@material-ui/icons/Work";
import {SchemaSectionId} from "models/schema/SchemaSectionId";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nestedListItem: {
    paddingLeft: theme.spacing(12),
  },
}));

export const SchemaTableOfContents: React.FunctionComponent<{
  getSchemaSectionHref: (schemaSectionId: SchemaSectionId) => string;
  getSlotHref: (slotId: string) => string;
  getStepHref: (stepId: string) => string;
  schema: {
    id: string;
    slots: readonly {id: string; roleName: string}[];
    steps: readonly {id: string; name: string}[];
  };
}> = ({getSchemaSectionHref, getSlotHref, getStepHref, schema}) => {
  const classes = useStyles();

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
                to={getSchemaSectionHref(schemaSection.id)}
              >
                {schemaSection.title}
              </Link>
            </ListItemText>
          </ListItem>
          {schemaSection.id === "slots" || schemaSection.id === "steps" ? (
            <List component="div" disablePadding>
              {schemaSection.id === "slots"
                ? schema.slots.map((slot) => (
                    <ListItem className={classes.nestedListItem} key={slot.id}>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={getSlotHref(slot.id)}>
                          Slot: {slot.roleName}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))
                : null}
              {schemaSection.id === "steps"
                ? schema.steps.map((step) => (
                    <ListItem className={classes.nestedListItem} key={step.id}>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={getStepHref(step.id)}>Step: {step.name}</Link>
                      </ListItemText>
                    </ListItem>
                  ))
                : null}
            </List>
          ) : null}
        </React.Fragment>
      ))}
    </List>
  );
};
