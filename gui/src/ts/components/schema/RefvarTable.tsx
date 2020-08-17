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

export const RefvarTable: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById;
}> = ({hrefs, schema}) => {
  const refvars = new Set<string>();
  for (const step of schema.steps) {
    if (!step.participants) {
      continue;
    }
    for (const participant of step.participants) {
      if (participant.refvar) {
        refvars.add(participant.refvar);
      }
    }
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Refvar</TableCell>
          {schema.steps.map((step) => (
            <TableCell key={step.id}>
              <Link to={hrefs.step(step)}>Step: {step.label}</Link>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...refvars].map((refvar) => {
          return (
            <TableRow key={refvar}>
              <TableCell>{refvar}</TableCell>
              {schema.steps.map((step) => {
                const participantsWithRefvar = step.participants?.filter(
                  (participant) => participant.refvar === refvar
                );
                return (
                  <TableCell key={step.id}>
                    {participantsWithRefvar &&
                    participantsWithRefvar.length > 0 ? (
                      <List>
                        {participantsWithRefvar.map((participant) => (
                          <ListItem key={participant.id}>
                            <ListItemText>
                              <Link to={hrefs.stepParticipant(participant)}>
                                {participant.label}
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
