import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {shortenUri} from "models/shortenUri";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";

export const PrimitivesTable: React.FunctionComponent<{
  namespacePrefixes: readonly NamespacePrefixFragment[] | null | undefined;
  primitives: {id: string; label: string; path: DefinitionPath}[];
}> = ({namespacePrefixes, primitives}) => (
  <Table data-cy="primitives-table">
    <TableBody>
      {primitives.map((primitive) => {
        const primitiveHref = Hrefs.sdfDocuments
          .sdfDocument({id: primitive.path.sdfDocument.id})
          .primitives.primitive(primitive)
          .toString();
        return (
          <TableRow data-cy={"primitive-" + primitive.id} key={primitive.id}>
            <TableCell data-cy="primitive-id">
              <Link to={primitiveHref}>
                {shortenUri({
                  namespacePrefixes,
                  uri: primitive.id,
                })}
              </Link>
            </TableCell>
            <TableCell data-cy="primitive-name">
              <Link to={primitiveHref}>{primitive.label}</Link>
            </TableCell>
            <TableCell data-cy="primitive-source">
              <SdfDocumentSourceLink to={primitive.path} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
