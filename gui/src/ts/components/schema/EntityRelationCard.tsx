import {SchemaPageQuery_schemaById_entityRelations} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as React from "react";

export const EntityRelationCard: React.FunctionComponent<{
  entityRelation: SchemaPageQuery_schemaById_entityRelations;
  entityRelationIndex: number;
}> = ({entityRelation, entityRelationIndex}) => (
  <Card>
    <CardHeader title={`Entity relation ${entityRelationIndex}`} />
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Predicate</TableCell>
            <TableCell>Object</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entityRelation.relations.map((relation, relationIndex) => (
            <React.Fragment>
              {relation.relationObjects.map(
                (relationObject, relationObjectIndex) => (
                  <TableRow
                    key={`relation-${relationIndex}-object-${relationObjectIndex}`}
                  >
                    <TableCell>{entityRelation.relationSubject}</TableCell>
                    <TableCell>{relation.relationPredicate}</TableCell>
                    <TableCell>{relationObject}</TableCell>
                  </TableRow>
                )
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
