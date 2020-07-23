import {
  SchemaPageQuery_schemaById_entityRelations,
  SchemaPageQuery_schemaById_slots,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";

export const EntityRelationCard: React.FunctionComponent<{
  entityRelation: SchemaPageQuery_schemaById_entityRelations;
  entityRelationIndex: number;
  hrefs: SchemaHrefs;
  slots: SchemaPageQuery_schemaById_slots[];
}> = ({entityRelation, entityRelationIndex, hrefs, slots}) => {
  const entityLink = (entityId: string): React.ReactNode => {
    const slot = slots.find((slot) => slot.id === entityId);
    if (slot) {
      return <Link href={hrefs.slot(slot)}>"Slot: " + slot.roleName</Link>;
    } else {
      return <span>{entityId}</span>;
    }
  };

  return (
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
                      <TableCell>
                        {entityLink(entityRelation.relationSubject)}
                      </TableCell>
                      <TableCell>{relation.relationPredicate}</TableCell>
                      <TableCell>{entityLink(relationObject)}</TableCell>
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
};
