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
import {makeStyles} from "@material-ui/core/styles";
import {NoRoute} from "components/error/NoRoute";
import {StepCard} from "components/schema/StepCard";
import {StepOrderCard} from "components/schema/StepOrderCard";

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: "100%",
  },
}));

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

  const classes = useStyles();

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
                <Accordion className={classes.accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <SchemaDetailsTable schema={schema} />
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item>
                <Accordion className={classes.accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Steps</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="column" spacing={4}>
                      {schema.steps.map((step) => (
                        <Grid item key={step.id}>
                          <StepCard step={step} />
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item>
                <Accordion className={classes.accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Order</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="column" spacing={4}>
                      {schema.order.map((stepOrder, stepOrderIndex) => (
                        <Grid item key={stepOrderIndex}>
                          <StepOrderCard stepOrder={stepOrder} />
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
