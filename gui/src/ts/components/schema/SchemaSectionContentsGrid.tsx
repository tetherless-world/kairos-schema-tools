import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {SchemaDetailsTable} from "components/schema/SchemaDetailsTable";
import {Grid} from "@material-ui/core";
import {StepCard} from "components/schema/StepCard";
import {StepOrderCard} from "components/schema/StepOrderCard";
import {EntityRelationCard} from "components/schema/EntityRelationCard";
import {SchemaSlotCard} from "components/schema/SchemaSlotCard";
import {SchemaHrefs} from "Hrefs";
import {schemaSections} from "models/schema/schemaSections";
import {TopLevelDefinitionSectionContents} from "components/definition/TopLevelDefinitionSectionContents";
import {TopLevelDefinitionSectionContentsGrid} from "components/definition/TopLevelDefinitionSectionContentsGrid";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";
import {ProvenanceDataObjectCard} from "components/schema/ProvenanceDataObjectCard";

export const SchemaSectionContentsGrid: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  schema: SchemaPageQuery_schemaById & {id: string};
}> = ({hrefs, namespacePrefixes, schema}) => {
  const schemaSectionContents: TopLevelDefinitionSectionContents[] = [];
  for (const schemaSection of schemaSections) {
    let children: React.ReactNode;
    switch (schemaSection.id) {
      case "details": {
        children = (
          <SchemaDetailsTable
            namespacePrefixes={namespacePrefixes}
            schema={schema}
          />
        );
        break;
      }
      case "entity-relations": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.entityRelations.map(
              (entityRelation, entityRelationIndex) => (
                <Grid item key={entityRelationIndex}>
                  <EntityRelationCard
                    entityRelation={entityRelation}
                    entityRelationIndex={entityRelationIndex}
                    hrefs={hrefs}
                    namespacePrefixes={namespacePrefixes}
                    schema={schema}
                  />
                </Grid>
              )
            )}
          </Grid>
        );
        break;
      }
      case "provenance-data": {
        if (!schema.provenanceData) {
          continue;
        }
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.provenanceData.map((provenanceDataObject) => (
              <Grid
                item
                id={hrefs.provenanceDataObjectId(provenanceDataObject)}
                key={provenanceDataObject.id}
              >
                <ProvenanceDataObjectCard
                  hrefs={hrefs}
                  provenanceDataObject={provenanceDataObject}
                />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      case "slots": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.slots.map((slot) => (
              <Grid item id={hrefs.slotId(slot)} key={slot.id}>
                <SchemaSlotCard
                  namespacePrefixes={namespacePrefixes}
                  slot={slot}
                />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      case "steps": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.steps.list.map((step) => (
              <Grid item id={hrefs.stepId(step)} key={step.id}>
                <StepCard
                  hrefs={hrefs}
                  namespacePrefixes={namespacePrefixes}
                  step={step}
                />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      case "step-order": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.order.map((stepOrder, stepOrderIndex) => (
              <Grid
                id={
                  stepOrder.id
                    ? hrefs.stepOrderId({id: stepOrder.id})
                    : undefined
                }
                item
                key={stepOrderIndex}
              >
                <StepOrderCard
                  hrefs={hrefs}
                  namespacePrefixes={namespacePrefixes}
                  stepOrder={stepOrder}
                  stepOrderIndex={stepOrderIndex}
                  steps={schema.steps.list}
                />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      default:
        throw new EvalError(schemaSection.id);
    }
    schemaSectionContents.push({...schemaSection, children});
  }

  return (
    <TopLevelDefinitionSectionContentsGrid
      dataCyPrefix={"schema"}
      sections={schemaSectionContents}
    />
  );
};
