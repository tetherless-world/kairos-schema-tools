import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {Link} from "components/link/Link";
import CheckIcon from "@material-ui/icons/Check";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    border: "2px solid !important",
  },
  tableCell: {
    borderLeft: "2px solid !important",
    textAlign: "center",
  },
}));

export const RefvarTable: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById;
}> = ({hrefs, schema}) => {
  const classes = useStyles();

  const refvars = new Set<string>();
  for (const entity of (schema.entities ?? []).filter(
    (entity) => !!entity.refvar
  )) {
    refvars.add(entity.refvar!);
  }
  for (const step of schema.steps.list.filter((step) => !!step.participants)) {
    for (const participant of step.participants!.filter(
      (participant) => !!participant.refvar
    )) {
      refvars.add(participant.refvar!);
    }
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>Refvar</TableCell>
          {(schema.entities ?? [])
            .filter((entity) => !!entity.refvar)
            .map((entity) => (
              <TableCell className={classes.tableCell} key={entity.id}>
                <Link to={hrefs.entity(entity)}>Entity: {entity.name}</Link>
              </TableCell>
            ))}
          {schema.steps.list.map((step) => (
            <TableCell className={classes.tableCell} key={step.id}>
              <Link to={hrefs.step(step)}>Step: {step.label}</Link>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...refvars].map((refvar) => {
          return (
            <TableRow key={refvar}>
              <TableCell className={classes.tableCell}>{refvar}</TableCell>
              {(schema.entities ?? [])
                .filter((entity) => !!entity.refvar)
                .map((entity) => (
                  <TableCell className={classes.tableCell}>
                    {entity.refvar === refvar ? <CheckIcon /> : null}
                  </TableCell>
                ))}
              {schema.steps.list.map((step) => {
                const participantsWithRefvar = step.participants?.filter(
                  (participant) => participant.refvar === refvar
                );
                return (
                  <TableCell className={classes.tableCell} key={step.id}>
                    {participantsWithRefvar &&
                    participantsWithRefvar.length > 0 ? (
                      <List>
                        {participantsWithRefvar.map((participant) => (
                          <ListItem key={participant.id}>
                            <ListItemText>
                              <Link to={hrefs.participant(participant)}>
                                Participant: {participant.label}
                              </Link>
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
