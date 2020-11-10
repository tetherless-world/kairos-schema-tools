import {
  SchemaPageQuery_schemaById,
  SchemaPageQuery_schemaById_steps_list_participants_values,
} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";
import {SchemaHrefs} from "Hrefs";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";
import {Link} from "components/link/Link";

export const ValueCard: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  schema: SchemaPageQuery_schemaById;
  value: SchemaPageQuery_schemaById_steps_list_participants_values;
}> = ({hrefs, namespacePrefixes, schema, value}) => {
  let entityHref: string | undefined;
  const entityEntity = schema.entities?.find(
    (entity) => entity.id === value.entity
  );
  if (entityEntity) {
    entityHref = hrefs.entityId(entityEntity);
  } else {
    const entityStep = schema.steps.list.find(
      (step) => step.id === value.entity
    );
    if (entityStep) {
      entityHref = hrefs.step(entityStep);
    }
  }

  const shortenedEntityId = shortenUri({namespacePrefixes, uri: value.entity});

  return (
    <Card>
      <CardHeader title={"Value: " + value.label} />
      <CardContent>
        <Table>
          <TableBody>
            <StringListFieldTableRow
              direction="column"
              name="Comments"
              values={value.comments}
            />
            <StringFieldTableRow
              name="Confidence"
              value={value.confidence ? value.confidence.toFixed(2) : null}
            />
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>
                {entityHref ? (
                  <Link to={entityHref}>{shortenedEntityId}</Link>
                ) : (
                  <span>{shortenedEntityId}</span>
                )}
              </TableCell>
            </TableRow>
            <StringListFieldTableRow
              direction="row"
              name="Modalities"
              values={value.modalities}
            />
            <JsonFieldTableRow
              name={"Private data"}
              value={value.privateData}
            />
            <ProvenancesFieldTableRow
              hrefs={hrefs}
              provenanceData={schema.provenanceData}
              provenances={value.provenances}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
