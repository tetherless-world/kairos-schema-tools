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
import {ProvenanceLink} from "components/link/ProvenanceLink";

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
    for (const step of schema.steps.list) {
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
              <TableCell>Identifier</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Predicate</TableCell>
              <TableCell>Object</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Provenance</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Relation provenance</TableCell>
              <TableCell>TA1 reference</TableCell>
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
                        {relation.id
                          ? shortenUri({namespacePrefixes, uri: relation.id})
                          : null}
                      </TableCell>
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
                            {entityRelation.comments.map(
                              (comment, commentIndex) => (
                                <ListItem key={commentIndex}>
                                  <ListItemText>{comment}</ListItemText>
                                </ListItem>
                              )
                            )}
                          </List>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {relation.confidence
                          ? relation.confidence.toFixed(2)
                          : null}
                      </TableCell>
                      <TableCell>
                        {relation.provenances &&
                        relation.provenances.length > 0 ? (
                          <List>
                            {relation.provenances.map((provenance) => (
                              <ListItem key={provenance}>
                                <ListItemText>
                                  <ProvenanceLink
                                    hrefs={hrefs}
                                    provenance={provenance}
                                    provenanceData={schema.provenanceData}
                                  />
                                </ListItemText>
                              </ListItem>
                            ))}
                          </List>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {relation.references &&
                        relation.references.length > 0 ? (
                          <List>
                            {relation.references.map((reference) => (
                              <ListItem key={reference}>
                                <ListItemText>{reference}</ListItemText>
                              </ListItem>
                            ))}
                          </List>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {relation.relationProvenance ? (
                          <ProvenanceLink
                            hrefs={hrefs}
                            provenanceData={schema.provenanceData}
                            provenance={relation.relationProvenance}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {relation.ta1ref
                          ? shortenUri({
                              namespacePrefixes,
                              uri: relation.ta1ref,
                            })
                          : null}
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
