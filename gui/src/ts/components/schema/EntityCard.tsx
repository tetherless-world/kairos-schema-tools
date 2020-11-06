import {
  SchemaPageQuery_schemaById,
  SchemaPageQuery_schemaById_entities,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";
import {EntityTypesFieldTableRow} from "components/table/EntityTypesFieldTableRow";

export const EntityCard: React.FunctionComponent<{
  entity: SchemaPageQuery_schemaById_entities;
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  schema: SchemaPageQuery_schemaById;
}> = ({entity, hrefs, namespacePrefixes, schema}) => (
  <Card>
    <CardHeader title={"Entity: " + entity.label} />
    <CardContent>
      <Table>
        <TableBody>
          <StringFieldTableRow
            name="Name"
            value={entity.name}
            valueDataCy="step-name"
          />
          <StringFieldTableRow
            name="Identifier"
            value={shortenUri({namespacePrefixes, uri: entity.id})}
          />
          <StringListFieldTableRow
            direction="column"
            name="Comments"
            values={entity.comments}
          />
          <EntityTypesFieldTableRow entityTypes={entity.entityTypes} />
          <JsonFieldTableRow name={"Private data"} value={entity.privateData} />
          <StringListFieldTableRow
            direction="column"
            name="References"
            values={
              entity.references
                ? entity.references.map((reference) =>
                    shortenUri({namespacePrefixes, uri: reference})
                  )
                : null
            }
          />
          <StringFieldTableRow name="Refvar" value={entity.refvar} />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
