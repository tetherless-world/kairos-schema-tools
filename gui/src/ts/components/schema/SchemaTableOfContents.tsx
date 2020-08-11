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
    paddingLeft: theme.spacing(12),
  },
}));

export const SchemaTableOfContents: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  includeSourceLinks?: boolean;
  schema: {
    id: string;
    slots: readonly {id: string; roleName: string}[];
    sdfDocumentId: string;
    steps: readonly {id: string; name: string}[];
  };
}> = ({hrefs, includeSourceLinks, schema}) => {
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
                to={hrefs.section(schemaSection.id)}
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
                        <Grid
                          container
                          spacing={2}
                          style={{alignItems: "center"}}
                        >
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
                  ))
                : null}
              {schemaSection.id === "steps"
                ? schema.steps.map((step) => (
                    <ListItem className={classes.nestedListItem} key={step.id}>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Grid
                          container
                          spacing={2}
                          style={{alignItems: "center"}}
                        >
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
