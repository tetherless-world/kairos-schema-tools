import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {primitiveSections} from "models/primitive/primitiveSections";
import * as React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import {Link} from "components/link/Link";
import WorkIcon from "@material-ui/icons/Work";
import {makeStyles} from "@material-ui/core/styles";
import {PrimitiveHrefs} from "Hrefs";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPath} from "models/definition/DefinitionPath";

const useStyles = makeStyles((theme) => ({
  nestedListItem: {
    paddingLeft: theme.spacing(4),
  },
}));

interface PrimitiveTableOfContentsEntry {
  id: string;
  label: string;
  path: DefinitionPath;
}

type PrimitiveTableOfContentsSlot = PrimitiveTableOfContentsEntry;

export const PrimitiveTableOfContents: React.FunctionComponent<{
  hrefs: PrimitiveHrefs;
  includeSourceLinks?: boolean;
  primitive: {
    id: string;
    slots: readonly PrimitiveTableOfContentsSlot[];
    path: DefinitionPath;
  };
}> = ({hrefs, includeSourceLinks, primitive}) => {
  const classes = useStyles();

  const SlotsList: React.FunctionComponent<{
    slots: readonly PrimitiveTableOfContentsSlot[];
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

  return (
    <List data-cy="primitive-toc">
      {primitiveSections.map((primitiveSection) => (
        <React.Fragment key={primitiveSection.id}>
          <ListItem>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText>
              <Link
                dataCy={`primitive-toc-${primitiveSection.id}-link`}
                to={hrefs.section(primitiveSection.id)}
              >
                {primitiveSection.title}
              </Link>
            </ListItemText>
          </ListItem>
          {primitiveSection.id === "slots" ? (
            <SlotsList slots={primitive.slots} />
          ) : null}
        </React.Fragment>
      ))}
    </List>
  );
};
