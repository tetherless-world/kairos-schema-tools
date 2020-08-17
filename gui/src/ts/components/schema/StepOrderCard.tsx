import {
  SchemaPageQuery_schemaById_order,
  SchemaPageQuery_schemaById_steps,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";

export const StepListTableRow: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  name: string;
  steps: SchemaPageQuery_schemaById_steps[];
  values: string[] | null;
}> = ({hrefs, name, steps, values}) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        <List>
          {values.map((value) => (
            <ListItemText key={value}>
              <Link to={hrefs.step({id: value})}>
                Step:&nbsp;
                {steps.find((step) => step.id === value)?.label ?? value}
              </Link>
            </ListItemText>
          ))}
        </List>
      </TableCell>
    </TableRow>
  );
};

export const StepOrderCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  stepOrder: SchemaPageQuery_schemaById_order;
  stepOrderIndex: number;
  steps: SchemaPageQuery_schemaById_steps[];
}> = ({hrefs, stepOrder, stepOrderIndex, steps}) => (
  <Card>
    <CardHeader title={`Step order ${stepOrderIndex}`} />
    <CardContent>
      <Table>
        <TableBody>
          {stepOrder.__typename === "BeforeAfterStepOrder" ? (
            <React.Fragment>
              <StepListTableRow
                hrefs={hrefs}
                name="Before"
                steps={steps}
                values={stepOrder.before}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="After"
                steps={steps}
                values={stepOrder.after}
              />
            </React.Fragment>
          ) : null}
          {stepOrder.__typename === "ContainerContainedStepOrder" ? (
            <React.Fragment>
              <StepListTableRow
                hrefs={hrefs}
                name="Container"
                steps={steps}
                values={[stepOrder.container]}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="Contained"
                steps={steps}
                values={stepOrder.contained}
              />
            </React.Fragment>
          ) : null}
          {stepOrder.__typename === "OverlapsStepOrder" ? (
            <StepListTableRow
              hrefs={hrefs}
              name="Overlaps"
              steps={steps}
              values={stepOrder.overlaps}
            />
          ) : null}
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={stepOrder.comments}
          />
          <StringListFieldTableRow
            direction="row"
            name="Flags"
            values={stepOrder.flags}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
