import {
  SchemaPageQuery_schemaById_order,
  SchemaPageQuery_schemaById_provenanceData,
  SchemaPageQuery_schemaById_steps_list,
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
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";
import {shortenUri} from "models/shortenUri";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";

export const StepListTableRow: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  name: string;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  steps: readonly SchemaPageQuery_schemaById_steps_list[];
  values: readonly string[] | null;
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

export const OrderCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  order: SchemaPageQuery_schemaById_order;
  orderIndex: number;
  steps: SchemaPageQuery_schemaById_steps_list[];
}> = ({hrefs, namespacePrefixes, provenanceData, order, orderIndex, steps}) => (
  <Card>
    <CardHeader title={`Step order ${order.label}`} />
    <CardContent>
      <Table>
        <TableBody>
          {order.__typename === "BeforeAfterOrder" ? (
            <React.Fragment>
              <StepListTableRow
                hrefs={hrefs}
                name="Before"
                provenanceData={provenanceData}
                steps={steps}
                values={order.before}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="After"
                provenanceData={provenanceData}
                steps={steps}
                values={order.after}
              />
            </React.Fragment>
          ) : null}
          {order.__typename === "ContainerContainedOrder" ? (
            <React.Fragment>
              <StepListTableRow
                hrefs={hrefs}
                name="Container"
                provenanceData={provenanceData}
                steps={steps}
                values={[order.container]}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="Contained"
                provenanceData={provenanceData}
                steps={steps}
                values={order.contained}
              />
            </React.Fragment>
          ) : null}
          {order.__typename === "OverlapsOrder" ? (
            <StepListTableRow
              hrefs={hrefs}
              name="Overlaps"
              provenanceData={provenanceData}
              steps={steps}
              values={order.overlaps}
            />
          ) : null}
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={order.comments}
          />
          <StringFieldTableRow
            name="Confidence"
            value={order.confidence?.toFixed(2)}
          />
          <StringListFieldTableRow
            direction="row"
            name="Flags"
            values={order.flags}
          />
          <StringFieldTableRow
            name="Identifier"
            value={
              order.id ? shortenUri({namespacePrefixes, uri: order.id}) : null
            }
          />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={provenanceData}
            provenances={order.provenances}
          />
          <StringFieldTableRow
            name="TA1 reference"
            value={
              order.ta1ref
                ? shortenUri({namespacePrefixes, uri: order.ta1ref})
                : null
            }
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
