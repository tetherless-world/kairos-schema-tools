import {DefinitionPathFragment} from "api/queries/types/DefinitionPathFragment";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import * as React from "react";

export const DefinitionPathLink: React.FunctionComponent<{
  path: DefinitionPathFragment;
}> = ({path}) => {
  const href = Hrefs.definitionPath(path);
  const sdfDocument = path.sdfDocument;

  let label: string;
  if (sdfDocument.primitive) {
    if (sdfDocument.primitive.slot) {
      label = "Primitive slot: " + sdfDocument.primitive.slot.label;
    } else {
      label = "Primitive: " + sdfDocument.primitive.label;
    }
  } else if (sdfDocument.schema) {
    if (sdfDocument.schema.slot) {
      label = "Schema slot: " + sdfDocument.schema.slot.label;
    } else if (sdfDocument.schema.step) {
      if (sdfDocument.schema.step.participant) {
        label = "Participant: " + sdfDocument.schema.step.participant.label;
      } else {
        label = "Step: " + sdfDocument.schema.step.label;
      }
    } else {
      label = "Schema: " + sdfDocument.schema.label;
    }
  } else {
    label = "Document: " + sdfDocument.label;
  }

  return <Link to={href}>{label}</Link>;
};
