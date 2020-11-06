import {
  SchemaPageQuery_schemaById,
  SchemaPageQuery_schemaById_entityRelations,
} from "api/queries/types/SchemaPageQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {shortenUri} from "models/shortenUri";
import {StringFieldTableRow} from "components/table/StringFieldTableRow";
import {StringListFieldTableRow} from "components/table/StringListFieldTableRow";
import {ProvenancesFieldTableRow} from "components/table/ProvenancesFieldTableRow";

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

  const shortenedEntityRelationId = entityRelation.id
    ? shortenUri({namespacePrefixes, uri: entityRelation.id})
    : null;

  return (
    <Card>
      <CardHeader
        title={`Entity relation ${
          shortenedEntityRelationId ?? entityRelationIndex
        }`}
      />
      <CardContent>
        <Table>
          <TableBody>
            <StringFieldTableRow
              name="Identifier"
              value={shortenedEntityRelationId}
            />
            <StringFieldTableRow name="Name" value={entityRelation.name} />
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>{entityLink(entityRelation.subject)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Predicate</TableCell>
              <TableCell>
                {shortenUri({
                  namespacePrefixes,
                  uri: entityRelation.predicate,
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Object</TableCell>
              <TableCell>{entityLink(entityRelation.object)}</TableCell>
            </TableRow>
            <StringListFieldTableRow
              direction="column"
              name="Comments"
              values={entityRelation.comments}
            />
            <StringFieldTableRow
              name="Confidence"
              value={
                entityRelation.confidence
                  ? entityRelation.confidence.toFixed(2)
                  : null
              }
            />
            <StringListFieldTableRow
              direction="row"
              name="Modalities"
              values={entityRelation.modalities}
            />
            <ProvenancesFieldTableRow
              hrefs={hrefs}
              provenanceData={schema.provenanceData}
              provenances={entityRelation.provenances}
            />
            <StringListFieldTableRow
              direction="column"
              name="References"
              values={entityRelation.references}
            />
            <ProvenancesFieldTableRow
              hrefs={hrefs}
              name="Relation provenance"
              provenanceData={schema.provenanceData}
              provenances={
                entityRelation.relationProvenance
                  ? [entityRelation.relationProvenance]
                  : null
              }
            />
            <StringFieldTableRow
              name="TA1 reference"
              value={
                entityRelation.ta1ref
                  ? shortenUri({
                      namespacePrefixes,
                      uri: entityRelation.ta1ref,
                    })
                  : null
              }
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
