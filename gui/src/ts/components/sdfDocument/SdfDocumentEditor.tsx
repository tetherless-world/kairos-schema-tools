import AceEditor from "react-ace";
import * as React from "react";
import {useState} from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import {useLazyQuery} from "@apollo/react-hooks";
import * as SdfDocumentEditorQueryDocument from "api/queries/SdfDocumentEditorQuery.graphql";
import {
  SdfDocumentEditorQuery,
  SdfDocumentEditorQuery_validateSdfDocument,
} from "api/queries/types/SdfDocumentEditorQuery";
import {ValidationMessageType} from "api/graphqlGlobalTypes";
import * as _ from "lodash";

const ValidationErrorsCard: React.FunctionComponent<{
  messages: SdfDocumentEditorQuery_validateSdfDocument[];
  title: string;
}> = ({messages, title}) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>
      <Table>
        <TableBody>
          {messages.map((message, messageIndex) => (
            <TableRow key={messageIndex.toString()}>
              <TableCell>{messageIndex + 1}</TableCell>
              <TableCell style={{overflowWrap: "break-word"}}>
                {message.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export const SdfDocumentEditor: React.FunctionComponent<{
  sourceJson: string;
}> = ({sourceJson: initialSourceJson}) => {
  const [sourceJson, setSourceJson] = useState<string>(initialSourceJson);

  const [validateSdfDocument, {data: validateSdfDocumentData}] = useLazyQuery<
    SdfDocumentEditorQuery
  >(SdfDocumentEditorQueryDocument);

  const validationMessagesByType: {
    [index: string]: SdfDocumentEditorQuery_validateSdfDocument[];
  } = {};
  if (validateSdfDocumentData) {
    for (const validationMessage of validateSdfDocumentData.validateSdfDocument) {
      let validationMessagesForType =
        validationMessagesByType[validationMessage.type];
      if (!validationMessagesForType) {
        validationMessagesForType = validationMessagesByType[
          validationMessage.type
        ] = [];
      }
      validationMessagesForType.push(validationMessage);
    }
  }

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
        {validateSdfDocumentData ? (
          <Grid container direction="column" spacing={8}>
            {validationMessagesByType[ValidationMessageType.Error] ? (
              <Grid item>
                <ValidationErrorsCard
                  messages={
                    validationMessagesByType[ValidationMessageType.Error]
                  }
                  title="Errors"
                />
              </Grid>
            ) : null}
            {validationMessagesByType[ValidationMessageType.Warning] ? (
              <Grid item>
                <ValidationErrorsCard
                  messages={
                    validationMessagesByType[ValidationMessageType.Warning]
                  }
                  title="Warnings"
                />
              </Grid>
            ) : null}
            {_.isEmpty(validationMessagesByType) ? (
              <Grid item>
                <h2>No validation errors detected.</h2>
              </Grid>
            ) : null}
          </Grid>
        ) : (
          <h2>Document not validated yet.</h2>
        )}
      </Grid>
    </Grid>
  );
};
