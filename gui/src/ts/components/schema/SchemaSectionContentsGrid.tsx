import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {SchemaDetailsTable} from "components/schema/SchemaDetailsTable";
import {Grid, Typography} from "@material-ui/core";
import {StepCard} from "components/schema/StepCard";
import {StepOrderCard} from "components/schema/StepOrderCard";
import {EntityRelationCard} from "components/schema/EntityRelationCard";
import {SlotCard} from "components/schema/SlotCard";
import {SchemaHrefs} from "Hrefs";
import {SchemaSection} from "models/schema/SchemaSection";
import {schemaSections} from "models/schema/schemaSections";

export const SchemaSectionContentsGrid: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById & {id: string};
}> = ({hrefs, schema}) => {
  interface SchemaSectionWithChildren extends SchemaSection {
    children: React.ReactNode;
  }

  const schemaSectionsWithChildren: SchemaSectionWithChildren[] = [];
  for (const schemaSection of schemaSections) {
    let children: React.ReactNode;
    switch (schemaSection.id) {
      case "details": {
        children = <SchemaDetailsTable schema={schema} />;
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
                    slots={schema.slots}
                  />
                </Grid>
              )
            )}
          </Grid>
        );
        break;
      }
      case "slots": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.slots.map((slot) => (
              <Grid item id={hrefs.slotId(slot)} key={slot.id}>
                <SlotCard slot={slot} />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      case "steps": {
        children = (
          <Grid container direction="column" spacing={4}>
            {schema.steps.map((step) => (
              <Grid item id={hrefs.stepId(step)} key={step.id}>
                <StepCard step={step} />
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
              <Grid item key={stepOrderIndex}>
                <StepOrderCard
                  hrefs={hrefs}
                  stepOrder={stepOrder}
                  stepOrderIndex={stepOrderIndex}
                  steps={schema.steps}
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
    schemaSectionsWithChildren.push({...schemaSection, children});
  }

  return (
    <Grid container direction="column" spacing={8}>
      {schemaSectionsWithChildren.map((schemaSection) => (
        <Grid
          data-cy={`schema-${schemaSection.id}`}
          key={schemaSection.id}
          item
        >
          <Grid container direction="column" id={schemaSection.id} spacing={4}>
            <Grid item>
              <Typography variant="h4">{schemaSection.title}</Typography>
            </Grid>
            <Grid>{schemaSection.children}</Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
