import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {PrimitivePageQuery_primitiveById} from "api/queries/types/PrimitivePageQuery";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {shortenUri} from "models/shortenUri";

export const PrimitiveDetailsTable: React.FunctionComponent<{
  primitive: PrimitivePageQuery_primitiveById & {id: string};
}> = ({primitive}) => (
  <Table>
    <TableBody>
      <StringFieldTableRow
        name="Name"
        value={primitive.name}
        valueDataCy="primitive-name"
      />
      <StringFieldTableRow
        name="Identifier"
        value={shortenUri({
          namespacePrefixes: primitive.path.sdfDocument.namespacePrefixes,
          uri: primitive.id,
        })}
        valueDataCy="primitive-id"
      />
      <TableRow>
        <TableCell>Super</TableCell>
        <TableCell data-cy="primitive-super">
          <Link
            to={Hrefs.sdfDocuments
              .sdfDocument({id: primitive.path.sdfDocument.id})
              .primitives.primitive({id: primitive.super})
              .toString()}
          >
            {shortenUri({
              namespacePrefixes: primitive.path.sdfDocument.namespacePrefixes,
              uri: primitive.super,
            })}
          </Link>
        </TableCell>
      </TableRow>
      <StringListFieldTableRow
        direction="column"
        name="Also known as"
        values={primitive.aka}
        valuesDataCy="primitive-aka"
      />
      <StringListFieldTableRow
        direction="column"
        name="Comments"
        values={primitive.comments}
        valuesDataCy="primitive-comments"
      />
      <StringFieldTableRow
        name="Description"
        value={primitive.description}
        valueDataCy="primitive-description"
      />
      <StringFieldTableRow
        name="Max duration"
        value={primitive.maxDuration ? primitive.maxDuration.string : null}
        valueDataCy="primitive-max-duration"
      />
      <StringFieldTableRow
        name="Min duration"
        value={primitive.minDuration ? primitive.minDuration.string : null}
        valueDataCy="primitive-min-duration"
      />
      <StringListFieldTableRow
        direction="column"
        name="References"
        values={primitive.references}
        valuesDataCy="primitive-references"
      />
      <StringFieldTableRow
        name="Template"
        value={primitive.template}
        valueDataCy="primitive-template"
      />
      <StringFieldTableRow
        name="Version"
        value={primitive.version}
        valueDataCy="primitive-version"
      />
    </TableBody>
  </Table>
);
