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

export const StepOrderCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
  stepOrder: SchemaPageQuery_schemaById_order;
  stepOrderIndex: number;
  steps: SchemaPageQuery_schemaById_steps_list[];
}> = ({
  hrefs,
  namespacePrefixes,
  provenanceData,
  stepOrder,
  stepOrderIndex,
  steps,
}) => (
  <Card>
    <CardHeader title={`Step order ${stepOrder.label}`} />
    <CardContent>
      <Table>
        <TableBody>
          {stepOrder.__typename === "BeforeAfterStepOrder" ? (
            <React.Fragment>
              <StepListTableRow
                hrefs={hrefs}
                name="Before"
                provenanceData={provenanceData}
                steps={steps}
                values={stepOrder.before}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="After"
                provenanceData={provenanceData}
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
                provenanceData={provenanceData}
                steps={steps}
                values={[stepOrder.container]}
              />
              <StepListTableRow
                hrefs={hrefs}
                name="Contained"
                provenanceData={provenanceData}
                steps={steps}
                values={stepOrder.contained}
              />
            </React.Fragment>
          ) : null}
          {stepOrder.__typename === "OverlapsStepOrder" ? (
            <StepListTableRow
              hrefs={hrefs}
              name="Overlaps"
              provenanceData={provenanceData}
              steps={steps}
              values={stepOrder.overlaps}
            />
          ) : null}
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={stepOrder.comments}
          />
          <StringFieldTableRow
            name="Confidence"
            value={stepOrder.confidence?.toFixed(2)}
          />
          <StringListFieldTableRow
            direction="row"
            name="Flags"
            values={stepOrder.flags}
          />
          <StringFieldTableRow
            name="Identifier"
            value={
              stepOrder.id
                ? shortenUri({namespacePrefixes, uri: stepOrder.id})
                : null
            }
          />
          <ProvenancesFieldTableRow
            hrefs={hrefs}
            provenanceData={provenanceData}
            provenances={stepOrder.provenances}
          />
          <StringFieldTableRow
            name="TA1 reference"
            value={
              stepOrder.ta1ref
                ? shortenUri({namespacePrefixes, uri: stepOrder.ta1ref})
                : null
            }
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
