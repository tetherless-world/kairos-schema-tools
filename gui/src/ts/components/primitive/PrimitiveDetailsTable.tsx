import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {PrimitivePageQuery_primitiveById} from "api/queries/types/PrimitivePageQuery";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {shortenUri} from "models/shortenUri";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {JsonFieldTableRow} from "components/table/JsonFieldTableRow";

export const PrimitiveDetailsTable: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  primitive: PrimitivePageQuery_primitiveById & {id: string};
}> = ({namespacePrefixes, primitive}) => (
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
          namespacePrefixes,
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
              namespacePrefixes,
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
        value={primitive.maxDuration?.string}
        valueDataCy="primitive-max-duration"
      />
      <StringFieldTableRow
        name="Min duration"
        value={primitive.minDuration?.string}
        valueDataCy="primitive-min-duration"
      />
      <JsonFieldTableRow name={"Private data"} value={primitive.privateData} />
      <StringListFieldTableRow
        direction="column"
        name="References"
        values={
          primitive.references
            ? primitive.references.map((reference) =>
                shortenUri({
                  namespacePrefixes,
                  uri: reference,
                })
              )
            : null
        }
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
