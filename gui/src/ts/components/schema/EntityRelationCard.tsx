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
              <TableCell>Modality</TableCell>
              <TableCell>Provenance</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Relation provenance</TableCell>
              <TableCell>TA1 reference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {entityRelation.id
                  ? shortenUri({namespacePrefixes, uri: entityRelation.id})
                  : null}
              </TableCell>
              <TableCell>{entityLink(entityRelation.subject)}</TableCell>
              <TableCell>
                {shortenUri({
                  namespacePrefixes,
                  uri: entityRelation.predicate,
                })}
              </TableCell>
              <TableCell>{entityLink(entityRelation.object)}</TableCell>
              <TableCell>{entityRelation.name}</TableCell>
              <TableCell>
                {entityRelation.comments &&
                entityRelation.comments.length > 0 ? (
                  <List>
                    {entityRelation.comments.map((comment, commentIndex) => (
                      <ListItem key={commentIndex}>
                        <ListItemText>{comment}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                ) : null}
              </TableCell>
              <TableCell>
                {entityRelation.confidence
                  ? entityRelation.confidence.toFixed(2)
                  : null}
              </TableCell>
              <TableCell>
                {entityRelation.modalities &&
                entityRelation.modalities.length > 0 ? (
                  <List>
                    {entityRelation.modalities.map(
                      (modality, modalityIndex) => (
                        <ListItem key={modalityIndex}>
                          <ListItemText>{modality}</ListItemText>
                        </ListItem>
                      )
                    )}
                  </List>
                ) : null}
              </TableCell>
              <TableCell>
                {entityRelation.provenances &&
                entityRelation.provenances.length > 0 ? (
                  <List>
                    {entityRelation.provenances.map((provenance) => (
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
                {entityRelation.references &&
                entityRelation.references.length > 0 ? (
                  <List>
                    {entityRelation.references.map((reference) => (
                      <ListItem key={reference}>
                        <ListItemText>{reference}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                ) : null}
              </TableCell>
              <TableCell>
                {entityRelation.relationProvenance ? (
                  <ProvenanceLink
                    hrefs={hrefs}
                    provenanceData={schema.provenanceData}
                    provenance={entityRelation.relationProvenance}
                  />
                ) : null}
              </TableCell>
              <TableCell>
                {entityRelation.ta1ref
                  ? shortenUri({
                      namespacePrefixes,
                      uri: entityRelation.ta1ref,
                    })
                  : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
