import {
  SchemaPageQuery_schemaById,
  SchemaPageQuery_schemaById_entityRelations,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";

export const EntityRelationCard: React.FunctionComponent<{
  entityRelation: SchemaPageQuery_schemaById_entityRelations;
  entityRelationIndex: number;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById;
}> = ({
  entityRelation,
  entityRelationIndex,
  hrefs,
  namespacePrefixes,
  schema,
}) => {
  const entityLink = (entityId: string): React.ReactNode => {
    for (const slot of schema.slots) {
      if (slot.id === entityId) {
        return <Link to={hrefs.slot(slot)}>Slot: {slot.label}</Link>;
      }
    }
    for (const step of schema.steps) {
      if (step.id === entityId) {
        return <Link to={hrefs.step(step)}>Step: {step.label}</Link>;
      }
      if (step.participants) {
        for (const participant of step.participants) {
          if (participant.id === entityId) {
            return (
              <Link to={hrefs.stepParticipant(participant)}>
                Participant: {participant.label}
              </Link>
            );
          }
        }
      }
    }

    return <span>{shortenUri({namespacePrefixes, uri: entityId})}</span>;
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
              <TableCell>Name</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entityRelation.relations.map((relation, relationIndex) => (
              <React.Fragment key={relationIndex.toString()}>
                {relation.relationObjects.map(
                  (relationObject, relationObjectIndex) => (
                    <TableRow
                      key={`relation-${relationIndex}-object-${relationObjectIndex}`}
                    >
                      <TableCell>
                        {entityLink(entityRelation.relationSubject)}
                      </TableCell>
                      <TableCell>
                        {shortenUri({
                          namespacePrefixes,
                          uri: relation.relationPredicate,
                        })}
                      </TableCell>
                      <TableCell>{entityLink(relationObject)}</TableCell>
                      <TableCell>{relation.name}</TableCell>
                      <TableCell>
                        {entityRelation.comments &&
                        entityRelation.comments.length > 0 ? (
                          <List>
                            {entityRelation.comments.map((comment) => (
                              <ListItem>
                                <ListItemText>{comment}</ListItemText>
                              </ListItem>
                            ))}
                          </List>
                        ) : null}
                      </TableCell>
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
