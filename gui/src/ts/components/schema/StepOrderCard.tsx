import {SchemaPageQuery_schemaById_order} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import * as React from "react";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const StepOrderCard: React.FunctionComponent<{
  stepOrder: SchemaPageQuery_schemaById_order;
  stepOrderIndex: number;
}> = ({stepOrder, stepOrderIndex}) => (
  <Card>
    <CardHeader title={`Step order ${stepOrderIndex}`} />
    <CardContent>
      <Table>
        <TableBody>
          {stepOrder.__typename === "BeforeAfterStepOrder" ? (
            <React.Fragment>
              <StringListFieldTableRow
                direction="column"
                name="Before"
                values={stepOrder.before}
              />
              <StringListFieldTableRow
                direction="column"
                name="After"
                values={stepOrder.after}
              />
            </React.Fragment>
          ) : null}
          {stepOrder.__typename === "ContainerContainedStepOrder" ? (
            <React.Fragment>
              <StringFieldTableRow
                name="Container"
                value={stepOrder.container}
              />
              <StringListFieldTableRow
                direction="column"
                name="Contained"
                values={stepOrder.contained}
              />
            </React.Fragment>
          ) : null}
          {stepOrder.__typename === "OverlapsStepOrder" ? (
            <StringListFieldTableRow
              direction="column"
              name="Overlaps"
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
