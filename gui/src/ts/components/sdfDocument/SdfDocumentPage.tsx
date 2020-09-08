import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
import {useQueryParam} from "use-query-params";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {
  SdfDocumentSaveMutation,
  SdfDocumentSaveMutationVariables,
} from "api/mutations/types/SdfDocumentSaveMutation";
import * as SdfDocumentAnnotatorReadableFormQueryDocument from "api/queries/SdfDocumentAnnotatorReadableFormQuery.graphql";
import * as SdfDocumentSaveMutationDocument from "api/mutations/SdfDocumentSaveMutation.graphql";
import {GraphQLError} from "graphql";
import {Grid, Snackbar, Tab, Tabs} from "@material-ui/core";
import {
  SdfDocumentValidationQuery,
  SdfDocumentValidationQueryVariables,
} from "api/queries/types/SdfDocumentValidationQuery";
import * as SdfDocumentValidationQueryDocument from "api/queries/SdfDocumentValidationQuery.graphql";
import {invariant} from "ts-invariant";
import {GraphQlErrorsList} from "components/error/GraphQlErrorsList";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {JsonQueryParamConfig} from "JsonQueryParamConfig";
import {SdfDocumentSourceTab} from "components/sdfDocument/SdfDocumentSourceTab";
import {
  SdfDocumentAnnotatorReadableFormQuery,
  SdfDocumentAnnotatorReadableFormQueryVariables,
} from "api/queries/types/SdfDocumentAnnotatorReadableFormQuery";
import {SdfDocumentAnnotatorReadableFormTab} from "components/sdfDocument/SdfDocumentAnnotatorReadableFormTab";

export const SdfDocumentPage: React.FunctionComponent = () => {
  const apolloClient = useApolloClient();

  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );

  const [definitionPath] = useQueryParam<DefinitionPath>(
    "path",
    new JsonQueryParamConfig<DefinitionPath>()
  );

  type TabValue = "annotator-readable-form" | "source";
  const tabDefinitions: readonly {label: string; value: TabValue}[] = [
    {label: "Source", value: "source"},
    {label: "Annotator readable form", value: "annotator-readable-form"},
  ];
  let [tab, setTab] = useQueryParam<TabValue>("tab");
  if (!tab) {
    tab = "source";
  }

  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {id: sdfDocumentId},
  });

  // Keep one big state in order to do batch updates.
  const [state, setState] = React.useState<{
    annotatorReadableForm: string | null;
    savedSdfDocument: SdfDocumentSourceFragment | null;
    snackbarMessage: React.ReactNode | null;
    volatileSourceJson: string | null;
    validationMessages: readonly ValidationMessageFragment[];
  }>({
    annotatorReadableForm: null,
    savedSdfDocument: null,
    snackbarMessage: null,
    volatileSourceJson: null,
    validationMessages: [],
  });

  const {
    annotatorReadableForm,
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

  const getAnnotatorReadableForm = () => {
    apolloClient
      .query<
        SdfDocumentAnnotatorReadableFormQuery,
        SdfDocumentAnnotatorReadableFormQueryVariables
      >({
        fetchPolicy: "no-cache",
        query: SdfDocumentAnnotatorReadableFormQueryDocument,
        variables: {json: volatileSourceJson!},
      })
      .then((result) => {
        if (result.data) {
          setState((prevState) => ({
            ...prevState,
            annotatorReadableForm:
              result.data.getSdfDocumentAnnotatorReadableForm,
            snackbarMessage: "Updated annotator readable form",
          }));
        } else if (result.errors) {
          setSnackbarMessageFromApolloErrors(result.errors);
        }
      });
  };

  const onSnackbarClose = () =>
    setState((prevState) => ({
      ...prevState,
      snackbarMessage: null,
    }));

  const onSave = () => {
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
            annotatorReadableForm: null,
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

  const onValidate = () => {
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

  const setSnackbarMessageFromApolloErrors = (
    errors: ReadonlyArray<GraphQLError>
  ) => {
    setState((prevState) => ({
      ...prevState,
      snackbarMessage: <GraphQlErrorsList errors={errors} />,
    }));
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

          if (!savedSdfDocument || !validationMessages || !volatileSourceJson) {
            throw new EvalError();
          }

          return (
            <StandardLayout
              breadcrumbs={{sdfDocument: savedSdfDocument}}
              rowItemStyle={{flexGrow: 1}}
              subtitle={savedSdfDocument.id}
              title={savedSdfDocument.label}
            >
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Tabs
                    onChange={(_, newValue) => setTab(newValue)}
                    value={tab}
                  >
                    {tabDefinitions.map((tabDefinition) => (
                      <Tab
                        data-cy={`${tabDefinition.value}-tab`}
                        key={tabDefinition.value}
                        label={tabDefinition.label}
                        value={tabDefinition.value}
                      />
                    ))}
                  </Tabs>
                </Grid>
                <Grid hidden={tab !== "annotator-readable-form"}>
                  <SdfDocumentAnnotatorReadableFormTab
                    annotatorReadableForm={annotatorReadableForm}
                    getAnnotatatorReadableForm={getAnnotatorReadableForm}
                  />
                </Grid>
                <Grid hidden={tab !== "source"} item>
                  <SdfDocumentSourceTab
                    definitionPath={definitionPath}
                    onChange={(sourceJson) =>
                      setState((prevState) => ({
                        ...prevState,
                        annotatorReadableForm: null,
                        volatileSourceJson: sourceJson,
                      }))
                    }
                    onSave={onSave}
                    onValidate={onValidate}
                    savedSdfDocument={savedSdfDocument}
                    validationMessages={validationMessages}
                    volatileSourceJson={volatileSourceJson}
                  />
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
