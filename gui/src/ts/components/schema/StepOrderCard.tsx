import {SchemaPageQuery_schemaById_order} from "api/queries/types/SchemaPageQuery";
import {Card, CardContent, Table} from "@material-ui/core";
import * as React from "react";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";

export const StepOrderCard: React.FunctionComponent<{
  stepOrder: SchemaPageQuery_schemaById_order;
}> = ({stepOrder}) => (
  <Card>
    <CardContent>
      <Table>
        {stepOrder.__typename === "BeforeAfterStepOrder" ? (
          <React.Fragment>
            <StringListFieldTableRow name="Before" values={stepOrder.before} />
            <StringListFieldTableRow name="After" values={stepOrder.after} />
          </React.Fragment>
        ) : null}
        {stepOrder.__typename === "ContainerContainedStepOrder" ? (
          <React.Fragment>
            <StringFieldTableRow name="Container" value={stepOrder.container} />
            <StringListFieldTableRow
              name="Contained"
              values={stepOrder.contained}
            />
          </React.Fragment>
        ) : null}
        {stepOrder.__typename === "OverlapsStepOrder" ? (
          <StringListFieldTableRow
            name="Overlaps"
            values={stepOrder.overlaps}
          />
        ) : null}
        <StringListFieldTableRow name="Comments" values={stepOrder.comments} />
        <StringListFieldTableRow name="Flags" values={stepOrder.flags} />
      </Table>
    </CardContent>
  </Card>
);
