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
import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
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
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Accordion,
  AccordionDetails,
} from "@material-ui/core";
import {
  SdfDocumentValidationQuery,
  SdfDocumentValidationQueryVariables,
} from "api/queries/types/SdfDocumentValidationQuery";
import * as SdfDocumentValidationQueryDocument from "api/queries/SdfDocumentValidationQuery.graphql";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";
import CloseIcon from "@material-ui/icons/Close";
import {invariant} from "ts-invariant";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  // @ts-ignore
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
    fetchPolicy: "network-only",
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
      snackbarMessage: (
        <List>
          {errors.map((error, errorIndex) => (
            <ListItem key={errorIndex}>
              <ListItemText>GraphQL error: {error.message}</ListItemText>
            </ListItem>
          ))}
        </List>
      ),
    }));
  };

  const validate = () => {
    apolloClient
      .query<SdfDocumentValidationQuery, SdfDocumentValidationQueryVariables>({
        fetchPolicy: "network-only",
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
                <Grid item xs={6}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <SdfDocumentEditor
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
                          <Button
                            color="primary"
                            data-cy="save-button"
                            onClick={() => save()}
                            size="large"
                            variant="contained"
                          >
                            Save
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color="secondary"
                            data-cy="validate-button"
                            onClick={() => validate()}
                            size="large"
                            variant="contained"
                          >
                            Validate
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h2>Validation messages ({validationMessages.length})</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ValidationMessagesTable
                        validationMessages={validationMessages}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </StandardLayout>
          );
        }}
      </Frame>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarMessage != null}
        autoHideDuration={2000}
        onClose={onSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};
