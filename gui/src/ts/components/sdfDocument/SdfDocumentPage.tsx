import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentEditor} from "components/sdfDocument/SdfDocumentEditor";
import {
  SdfDocumentSourceFragment,
  SdfDocumentSourceFragment_schemas,
} from "api/queries/types/SdfDocumentSourceFragment";
import {useQueryParam} from "use-query-params";
import {SdfDocumentSourcePath} from "models/sdfDocument/SdfDocumentSourcePath";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {
  SdfDocumentSaveMutation,
  SdfDocumentSaveMutationVariables,
} from "api/mutations/types/SdfDocumentSaveMutation";
import * as SdfDocumentSaveMutationDocument from "api/mutations/SdfDocumentSaveMutation.graphql";
import {GraphQLError} from "graphql";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Snackbar,
} from "@material-ui/core";
import {
  SdfDocumentValidationQuery,
  SdfDocumentValidationQueryVariables,
} from "api/queries/types/SdfDocumentValidationQuery";
import * as SdfDocumentValidationQueryDocument from "api/queries/SdfDocumentValidationQuery.graphql";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";
import {invariant} from "ts-invariant";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {SchemaTableOfContents} from "components/schema/SchemaTableOfContents";
import {Hrefs} from "Hrefs";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";
import {GraphQlErrorsList} from "components/error/GraphQlErrorsList";

const getJsonNodeLocation = (
  sdfDocument: SdfDocumentSourceFragment,
  sdfDocumentSourcePath: SdfDocumentSourcePath
): JsonNodeLocationFragment | undefined => {
  if (!sdfDocumentSourcePath.schemaId) {
    return undefined;
  }
  const schema = sdfDocument.schemas.find(
    (schema) => schema.id === sdfDocumentSourcePath.schemaId
  );
  if (!schema) {
    return undefined;
  }
  let result = schema.sourceJsonNodeLocation;
  if (sdfDocumentSourcePath.slotId) {
    const slot = schema.slots.find(
      (slot) => slot.id === sdfDocumentSourcePath.slotId
    );
    if (slot) {
      result = slot.sourceJsonNodeLocation;
    }
  } else if (sdfDocumentSourcePath.stepId) {
    const step = schema.steps.find(
      (step) => step.id === sdfDocumentSourcePath.stepId
    );
    if (!step) {
      return result;
    }
    result = step.sourceJsonNodeLocation;
    if (sdfDocumentSourcePath.stepParticipantId) {
      const stepParticipant = step.participants?.find(
        (participant) =>
          participant.id === sdfDocumentSourcePath.stepParticipantId
      );
      if (stepParticipant) {
        result = stepParticipant.sourceJsonNodeLocation;
      }
    }
  }
  return result;
};

const RightPanelAccordion: React.FunctionComponent<React.PropsWithChildren<{
  title: string;
}>> = ({children, title}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h2>{title}</h2>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

const SaveButton: React.FunctionComponent<{onClick: () => void}> = ({
  onClick,
}) => (
  <Button
    color="primary"
    data-cy="save-button"
    onClick={onClick}
    size="large"
    variant="contained"
  >
    Save
  </Button>
);

const SchemaAccordion: React.FunctionComponent<{
  schema: SdfDocumentSourceFragment_schemas;
}> = ({schema}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h3>Schema: {schema.name}</h3>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column">
        <Grid item>
          <SdfDocumentSourceLink
            to={{
              sdfDocumentId: schema.sdfDocumentId,
              schemaId: schema.id,
            }}
          />
        </Grid>
        <Grid item>
          <SchemaTableOfContents
            hrefs={Hrefs.sdfDocuments
              .sdfDocument({id: schema.sdfDocumentId})
              .schemas.schema(schema)}
            includeSourceLinks={true}
            schema={schema}
          />
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const ValidateButton: React.FunctionComponent<{onClick: () => void}> = ({
  onClick,
}) => (
  <Button
    color="secondary"
    data-cy="validate-button"
    onClick={onClick}
    size="large"
    variant="contained"
  >
    Validate
  </Button>
);

export const SdfDocumentPage: React.FunctionComponent = () => {
  const apolloClient = useApolloClient();

  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );

  const [goToSchemaId] = useQueryParam<string>("schemaId");
  const [goToSlotId] = useQueryParam<string>("slotId");
  const [goToStepId] = useQueryParam<string>("stepId");
  const [goToStepParticipantId] = useQueryParam<string>("stepParticipantId");
  const goToPath: SdfDocumentSourcePath | undefined =
    goToSchemaId || goToSlotId || goToStepId || goToStepParticipantId
      ? {
          schemaId: goToSchemaId ? goToSchemaId : undefined,
          sdfDocumentId,
          slotId: goToSlotId ? goToSlotId : undefined,
          stepId: goToStepId ? goToStepId : undefined,
          stepParticipantId: goToStepParticipantId
            ? goToStepParticipantId
            : undefined,
        }
      : undefined;
  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {id: sdfDocumentId},
  });

  // Keep one big state in order to do batch updates.
  const [state, setState] = React.useState<{
    savedSdfDocument: SdfDocumentSourceFragment | null;
    snackbarMessage: React.ReactNode | null;
    volatileSourceJson: string | null;
    validationMessages: readonly ValidationMessageFragment[];
  }>({
    savedSdfDocument: null,
    snackbarMessage: null,
    volatileSourceJson: null,
    validationMessages: [],
  });

  const {
    savedSdfDocument,
    snackbarMessage,
    validationMessages,
    volatileSourceJson,
  } = state;
  // Enforce some invariants
  if (savedSdfDocument) {
    invariant(volatileSourceJson, "source must be set if savedSdfDocument is");
  } else {
    invariant(
      !volatileSourceJson,
      "source must not be set if savedSdfDocument is not"
    );
  }

  const onSnackbarClose = () =>
    setState((prevState) => ({
      ...prevState,
      snackbarMessage: null,
    }));

  const save = () => {
    apolloClient
      .mutate<SdfDocumentSaveMutation, SdfDocumentSaveMutationVariables>({
        fetchPolicy: "no-cache",
        mutation: SdfDocumentSaveMutationDocument,
        variables: {json: volatileSourceJson!},
      })
      .then((result) => {
        if (result.data) {
          setState((prevState) => ({
            ...prevState,
            savedSdfDocument: result.data!.putSdfDocument,
            snackbarMessage: "Saved",
            volatileSourceJson: result.data!.putSdfDocument.sourceJson,
            validateMessages: result.data!.putSdfDocument.validationMessages,
          }));
        } else if (result.errors) {
          setSnackbarMessageFromApolloErrors(result.errors);
        }
      });
  };

  const setSnackbarMessageFromApolloErrors = (
    errors: ReadonlyArray<GraphQLError>
  ) => {
    setState((prevState) => ({
      ...prevState,
      snackbarMessage: <GraphQlErrorsList errors={errors} />,
    }));
  };

  const validate = () => {
    apolloClient
      .query<SdfDocumentValidationQuery, SdfDocumentValidationQueryVariables>({
        fetchPolicy: "no-cache",
        query: SdfDocumentValidationQueryDocument,
        variables: {json: volatileSourceJson!},
      })
      .then((result) => {
        if (result.data) {
          setState((prevState) => ({
            ...prevState,
            snackbarMessage: "Validated",
            validationMessages: result.data.validateSdfDocument,
          }));
        } else if (result.errors) {
          setSnackbarMessageFromApolloErrors(result.errors);
        }
      });
  };

  return (
    <>
      <Frame {...query}>
        {({data: initialData}) => {
          if (!initialData.sdfDocumentById) {
            return <NoRoute />;
          }

          if (state.savedSdfDocument === null) {
            // Set state from initial data
            setState((prevState) => ({
              ...prevState,
              savedSdfDocument: initialData.sdfDocumentById!,
              validationMessages: initialData.sdfDocumentById!
                .validationMessages,
              volatileSourceJson: initialData.sdfDocumentById!.sourceJson,
            }));
            return;
          }

          if (!savedSdfDocument) {
            throw new EvalError();
          }

          return (
            <StandardLayout
              breadcrumbs={{sdfDocument: savedSdfDocument}}
              rowItemStyle={{flexGrow: 1}}
              subtitle={savedSdfDocument.id}
              title={savedSdfDocument.name}
            >
              <Grid
                container
                data-cy="sdf-document-editor"
                direction="row"
                spacing={4}
              >
                <Grid item xs={8}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <SdfDocumentEditor
                        goToJsonNodeLocation={
                          goToPath
                            ? getJsonNodeLocation(savedSdfDocument, goToPath)
                            : undefined
                        }
                        onChange={(sourceJson) =>
                          setState((prevState) => ({
                            ...prevState,
                            volatileSourceJson: sourceJson,
                          }))
                        }
                        sourceJson={volatileSourceJson!}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container spacing={8}>
                        <Grid item>
                          <SaveButton onClick={save} />
                        </Grid>
                        <Grid item>
                          <ValidateButton onClick={validate} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="column" spacing={8}>
                    <Grid item>
                      <RightPanelAccordion title="Table of contents">
                        <Grid container direction="column">
                          {savedSdfDocument.schemas.map((schema) => (
                            <Grid item key={schema.id}>
                              <SchemaAccordion schema={schema} />
                            </Grid>
                          ))}
                        </Grid>
                      </RightPanelAccordion>
                    </Grid>
                    <Grid item>
                      <RightPanelAccordion
                        title={`Validation messages (${validationMessages.length})`}
                      >
                        <ValidationMessagesTable
                          validationMessages={validationMessages}
                        />
                      </RightPanelAccordion>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </StandardLayout>
          );
        }}
      </Frame>
      <Snackbar message={snackbarMessage} onClose={onSnackbarClose} />
    </>
  );
};
