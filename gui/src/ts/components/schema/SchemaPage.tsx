import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SchemaPageQueryDocument from "api/queries/SchemaPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {SchemaPageQuery} from "api/queries/types/SchemaPageQuery";
import {StandardLayoutBreadcrumbs} from "components/layout/StandardLayoutBreadcrumbs";
import {StandardLayout} from "components/layout/StandardLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {SchemaDetailsTable} from "components/schema/SchemaDetailsTable";
import {NoRoute} from "components/error/NoRoute";
import {StepCard} from "components/schema/StepCard";
import {StepOrderCard} from "components/schema/StepOrderCard";
import {EntityRelationCard} from "components/schema/EntityRelationCard";
import {SlotCard} from "components/schema/SlotCard";

const SchemaPartAccordion: React.FunctionComponent<React.PropsWithChildren<{
  title: string;
}>> = ({children, title}) => (
  <Accordion style={{width: "100%"}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

export const SchemaPage: React.FunctionComponent = () => {
  let {schemaId, sdfDocumentId} = useParams<{
    schemaId: string;
    sdfDocumentId?: string;
  }>();
  schemaId = decodeURIComponent(schemaId);
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemaPageQuery>(SchemaPageQueryDocument, {
    variables: {
      schemaId,
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.schemaById) {
          return <NoRoute />;
        }

        let breadcrumbs: StandardLayoutBreadcrumbs;
        const schema = Object.assign({}, data.schemaById!, {id: schemaId});
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            schema,
            sdfDocument: {id: sdfDocumentId, name: sdfDocument!.name},
          };
        } else {
          breadcrumbs = {schema};
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={schema.id}
            title={
              <span>
                Schema: <strong data-cy="schema-name">{schema.name}</strong>
              </span>
            }
          >
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <SchemaPartAccordion title="Details">
                  <SchemaDetailsTable schema={schema} />
                </SchemaPartAccordion>
              </Grid>
              <Grid item>
                <SchemaPartAccordion title="Steps">
                  <Grid container direction="column" spacing={4}>
                    {schema.steps.map((step) => (
                      <Grid item key={step.id}>
                        <StepCard step={step} />
                      </Grid>
                    ))}
                  </Grid>
                </SchemaPartAccordion>
              </Grid>
              <Grid item>
                <SchemaPartAccordion title="Step order">
                  <Grid container direction="column" spacing={4}>
                    {schema.order.map((stepOrder, stepOrderIndex) => (
                      <Grid item key={stepOrderIndex}>
                        <StepOrderCard
                          stepOrder={stepOrder}
                          stepOrderIndex={stepOrderIndex}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SchemaPartAccordion>
              </Grid>
              <Grid item>
                <SchemaPartAccordion title="Entity relations">
                  <Grid container direction="column" spacing={4}>
                    {schema.entityRelations.map(
                      (entityRelation, entityRelationIndex) => (
                        <Grid item key={entityRelationIndex}>
                          <EntityRelationCard
                            entityRelation={entityRelation}
                            entityRelationIndex={entityRelationIndex}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </SchemaPartAccordion>
              </Grid>
              <Grid item>
                <SchemaPartAccordion title="Slots">
                  <Grid container direction="column" spacing={4}>
                    {schema.slots.map((slot) => (
                      <Grid item key={slot.id}>
                        <SlotCard slot={slot} />
                      </Grid>
                    ))}
                  </Grid>
                </SchemaPartAccordion>
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
