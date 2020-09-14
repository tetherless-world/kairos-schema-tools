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

export const AchievesRequiresTable: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById;
}> = ({hrefs, schema}) => {
  const achievesRequiresValues = new Set<string>();
  for (const step of schema.steps.list) {
    if (step.achieves) {
      for (const achievesValue of step.achieves) {
        achievesRequiresValues.add(achievesValue);
      }
    }
    if (step.requires) {
      for (const requiresValue of step.requires) {
        achievesRequiresValues.add(requiresValue);
      }
    }
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Achieves/Requires</TableCell>
          {schema.steps.list.map((step) => (
            <TableCell key={step.id}>
              <Link to={hrefs.step(step)}>Step: {step.label}</Link>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...achievesRequiresValues].map((achievesRequiresValue) => {
          return (
            <TableRow key={achievesRequiresValue}>
              <TableCell>{achievesRequiresValue}</TableCell>
              {schema.steps.list.map((step) => {
                const listItems: React.ReactNode[] = [];
                if (
                  step.achieves &&
                  step.achieves.some(
                    (achievesValue) => achievesValue === achievesRequiresValue
                  )
                ) {
                  listItems.push(
                    <ListItem key={"achieves-" + achievesRequiresValue}>
                      <ListItemText>Achieves</ListItemText>
                    </ListItem>
                  );
                }
                if (
                  step.requires &&
                  step.requires.some(
                    (requiresValue) => requiresValue === achievesRequiresValue
                  )
                ) {
                  listItems.push(
                    <ListItem key={"requires-" + achievesRequiresValue}>
                      <ListItemText>Requires</ListItemText>
                    </ListItem>
                  );
                }
                return (
                  <TableCell key={step.id}>
                    {listItems.length > 0 ? <List>{listItems}</List> : null}
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
