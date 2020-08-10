import AceEditor from "react-ace";
import * as React from "react";
import {useState} from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {GraphQLError} from "graphql";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@material-ui/core";
import {useApolloClient} from "@apollo/react-hooks";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";
import * as SdfDocumentEditorValidationQueryDocument from "api/queries/SdfDocumentEditorValidationQuery.graphql";
import * as SdfDocumentEditorSaveMutationDocument from "api/mutations/SdfDocumentEditorSaveMutation.graphql";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {
  SdfDocumentEditorValidationQuery,
  SdfDocumentEditorValidationQueryVariables,
} from "api/queries/types/SdfDocumentEditorValidationQuery";
import {
  SdfDocumentEditorSaveMutation,
  SdfDocumentEditorSaveMutationVariables,
} from "api/mutations/types/SdfDocumentEditorSaveMutation";
import CloseIcon from "@material-ui/icons/Close";
import {SdfDocumentPageFragment} from "api/queries/types/SdfDocumentPageFragment";
import {SchemaPathFragment} from "api/queries/types/SchemaPathFragment";
import ReactAce from "react-ace";

export const SdfDocumentEditor: React.FunctionComponent<{
  goToSchemaPath?: SchemaPathFragment;
  onChange?: (sdfDocument: SdfDocumentPageFragment) => void;
  sdfDocument: SdfDocumentPageFragment;
}> = ({onChange, sdfDocument: initialSdfDocument}) => {
  const aceEditorRef = React.useCallback((aceEditor: ReactAce) => {
    console.log("Got ace editor");
  }, []);

  const apolloClient = useApolloClient();

  const [
    snackbarMessage,
    setSnackbarMessage,
  ] = useState<React.ReactNode | null>(null);
  const [sourceJson, setSourceJson] = useState<string>(
    initialSdfDocument.sourceJson
  );
  const [validationMessages, setValidationMessages] = useState<
    readonly ValidationMessageFragment[]
  >(initialSdfDocument.validationMessages);

  const onSnackbarClose = () => setSnackbarMessage((prevState) => null);

  const save = () => {
    apolloClient
      .mutate<
        SdfDocumentEditorSaveMutation,
        SdfDocumentEditorSaveMutationVariables
      >({
        fetchPolicy: "no-cache",
        mutation: SdfDocumentEditorSaveMutationDocument,
        variables: {json: sourceJson},
      })
      .then((result) => {
        if (result.data) {
          if (onChange) {
            onChange(result.data.putSdfDocument);
          }
          setSnackbarMessage("Saved");
          setValidationMessages(result.data.putSdfDocument.validationMessages);
        } else if (result.errors) {
          setSnackbarMessageFromApolloErrors(result.errors);
        }
      });
  };

  const setSnackbarMessageFromApolloErrors = (
    errors: ReadonlyArray<GraphQLError>
  ) => {
    setSnackbarMessage((prevState) => (
      <List>
        {errors.map((error, errorIndex) => (
          <ListItem key={errorIndex}>
            <ListItemText>GraphQL error: {error.message}</ListItemText>
          </ListItem>
        ))}
      </List>
    ));
  };

  const validate = () => {
    apolloClient
      .query<
        SdfDocumentEditorValidationQuery,
        SdfDocumentEditorValidationQueryVariables
      >({
        fetchPolicy: "network-only",
        query: SdfDocumentEditorValidationQueryDocument,
        variables: {json: sourceJson},
      })
      .then((result) => {
        if (result.data) {
          setSnackbarMessage("Validated");
          setValidationMessages(result.data.validateSdfDocument);
        } else if (result.errors) {
          setSnackbarMessageFromApolloErrors(result.errors);
        }
      });
  };

  return (
    <>
      <Grid container data-cy="sdf-document-editor" direction="row" spacing={4}>
        <Grid item xs={8}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <AceEditor
                enableSnippets={false}
                mode="json"
                onChange={setSourceJson}
                ref={aceEditorRef}
                style={{width: "100%"}}
                theme="github"
                value={sourceJson}
              ></AceEditor>
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
        <Grid item xs={4}>
          <ValidationMessagesTable validationMessages={validationMessages} />
        </Grid>
      </Grid>

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
