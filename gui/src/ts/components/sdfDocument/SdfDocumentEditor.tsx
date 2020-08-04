import AceEditor from "react-ace";
import * as React from "react";
import {useState} from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {Button, Grid} from "@material-ui/core";
import {useApolloClient} from "@apollo/react-hooks";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";
import * as SdfDocumentEditorValidationQueryDocument from "api/queries/SdfDocumentEditorValidationQuery.graphql";
import {SdfDocumentPageQuery_sdfDocumentById} from "api/queries/types/SdfDocumentPageQuery";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {
  SdfDocumentEditorValidationQuery,
  SdfDocumentEditorValidationQueryVariables,
} from "api/queries/types/SdfDocumentEditorValidationQuery";

export const SdfDocumentEditor: React.FunctionComponent<{
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById;
}> = ({sdfDocument: initialSdfDocument}) => {
  const apolloClient = useApolloClient();
  const [sourceJson, setSourceJson] = useState<string>(
    initialSdfDocument.sourceJson
  );
  const [validationMessages, setValidationMessages] = useState<
    readonly ValidationMessageFragment[]
  >(initialSdfDocument.validationMessages);

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
          setValidationMessages(result.data.validateSdfDocument);
        }
      });
  };

  return (
    <Grid container data-cy="sdf-document-editor" direction="row" spacing={4}>
      <Grid item xs={8}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <AceEditor
              enableSnippets={false}
              mode="json"
              onChange={setSourceJson}
              style={{width: "100%"}}
              theme="github"
              value={sourceJson}
            ></AceEditor>
          </Grid>
          <Grid item>
            <Button
              color="primary"
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
      <Grid item xs={4}>
        <ValidationMessagesTable validationMessages={validationMessages} />
      </Grid>
    </Grid>
  );
};
