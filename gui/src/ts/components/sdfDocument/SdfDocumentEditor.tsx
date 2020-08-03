import AceEditor from "react-ace";
import * as React from "react";
import {useState} from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {Button, Grid} from "@material-ui/core";
import {useLazyQuery} from "@apollo/react-hooks";
import * as SdfDocumentEditorQueryDocument from "api/queries/SdfDocumentEditorQuery.graphql";
import {SdfDocumentEditorQuery} from "api/queries/types/SdfDocumentEditorQuery";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";

export const SdfDocumentEditor: React.FunctionComponent<{
  initialValidationMessages: ValidationMessageFragment[];
  sourceJson: string;
}> = ({initialValidationMessages, sourceJson: initialSourceJson}) => {
  const [sourceJson, setSourceJson] = useState<string>(initialSourceJson);

  const [validateSdfDocument, {data: validateSdfDocumentData}] = useLazyQuery<
    SdfDocumentEditorQuery
  >(SdfDocumentEditorQueryDocument);

  return (
    <Grid container direction="row" spacing={4}>
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
              onClick={() => {
                validateSdfDocument({variables: {json: sourceJson}});
              }}
              size="large"
              variant="contained"
            >
              Validate
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <ValidationMessagesTable
          validationMessages={
            validateSdfDocumentData
              ? validateSdfDocumentData.validateSdfDocument
              : initialValidationMessages
          }
        />
      </Grid>
    </Grid>
  );
};
