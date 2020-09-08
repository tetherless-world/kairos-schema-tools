import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentSourceEditor} from "components/sdfDocument/SdfDocumentSourceEditor";
import {
  SdfDocumentSourceFragment,
  SdfDocumentSourceFragment_primitives,
  SdfDocumentSourceFragment_schemas,
} from "api/queries/types/SdfDocumentSourceFragment";
import {useQueryParam} from "use-query-params";
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
import {GraphQlErrorsList} from "components/error/GraphQlErrorsList";
import {getJsonNodeLocationFromDefinitionPath} from "models/definition/getJsonNodeLocationFromDefinitionPath";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {JsonQueryParamConfig} from "JsonQueryParamConfig";
import {PrimitiveTableOfContents} from "components/primitive/PrimitiveTableOfContents";

const PrimitiveAccordion: React.FunctionComponent<{
  primitive: SdfDocumentSourceFragment_primitives;
}> = ({primitive}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h3>Primitive: {primitive.label}</h3>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column">
        <Grid item>
          <SdfDocumentSourceLink to={primitive.path} />
        </Grid>
        <Grid item>
          <PrimitiveTableOfContents
            hrefs={Hrefs.sdfDocuments
              .sdfDocument({id: primitive.path.sdfDocument.id})
              .primitives.primitive(primitive)}
            includeSourceLinks={true}
            primitive={primitive}
          />
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

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
      <h3>Schema: {schema.label}</h3>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column">
        <Grid item>
          <SdfDocumentSourceLink to={schema.path} />
        </Grid>
        <Grid item>
          <SchemaTableOfContents
            hrefs={Hrefs.sdfDocuments
              .sdfDocument({id: schema.path.sdfDocument.id})
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

  const [definitionPath] = useQueryParam<DefinitionPath>(
    "path",
    new JsonQueryParamConfig<DefinitionPath>()
  );
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
              title={savedSdfDocument.label}
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
                      <SdfDocumentSourceEditor
                        goToJsonNodeLocation={
                          definitionPath
                            ? getJsonNodeLocationFromDefinitionPath(
                                definitionPath,
                                savedSdfDocument
                              )
                            : undefined
                        }
                        onChange={(sourceJson) =>
                          setState((prevState) => ({
                            ...prevState,
                            volatileSourceJson: sourceJson,
                          }))
                        }
                        savedSdfDocument={savedSdfDocument}
                        validationMessages={validationMessages}
                        volatileSourceJson={volatileSourceJson!}
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
                          {savedSdfDocument.primitives.map((primitive) => (
                            <Grid item key={primitive.id}>
                              <PrimitiveAccordion primitive={primitive} />
                            </Grid>
                          ))}
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
