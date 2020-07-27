import * as React from "react";
import {Table} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {SchemaPageQuery_schemaById_steps} from "api/queries/types/SchemaPageQuery";

export const StepDetailsTable: React.FunctionComponent<{
  step: SchemaPageQuery_schemaById_steps;
}> = ({step}) => (
  <Table data-cy={"step-" + step.id}>
    <StringFieldTableRow
      name="Name"
      value={step.name}
      valueDataCy="step-name"
    />
    <StringFieldTableRow
      name="Identifier"
      value={step.id}
      valueDataCy="step-id"
    />
    <StringListFieldTableRow
      direction="column"
      name="Also known as"
      values={step.aka}
      valuesDataCy="step-aka"
    />
    <StringListFieldTableRow
      direction="column"
      name="Comments"
      values={step.comments}
      valuesDataCy="step-comments"
    />
    <StringListFieldTableRow
      direction="column"
      name="Achieves"
      values={step.achieves}
    />
    <StringListFieldTableRow
      direction="column"
      name="Requires"
      values={step.requires}
    />
    <StringFieldTableRow
      name="Max duration"
      value={step.maxDuration ? step.maxDuration.string : null}
      valueDataCy="step-max-duration"
    />
    <StringFieldTableRow
      name="Min duration"
      value={step.minDuration ? step.minDuration.string : null}
      valueDataCy="step-min-duration"
    />
    <StringListFieldTableRow
      direction="column"
      name="References"
      values={step.references}
      valuesDataCy="step-references"
    />
    <StringFieldTableRow
      name="Type"
      value={step.type}
      valueDataCy="step-type"
    />
  </Table>
);
