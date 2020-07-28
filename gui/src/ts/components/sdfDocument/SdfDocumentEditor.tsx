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
import {SdfDocumentEditorQuery} from "api/queries/types/SdfDocumentEditorQuery";

const ValidationErrorsCard: React.FunctionComponent<{
  messages: string[];
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
                {message}
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
            {validateSdfDocumentData.validateSdfDocument.errorsList.length >
            0 ? (
              <Grid item>
                <ValidationErrorsCard
                  messages={
                    validateSdfDocumentData.validateSdfDocument.errorsList
                  }
                  title="Errors"
                />
              </Grid>
            ) : null}
            {validateSdfDocumentData.validateSdfDocument.warningsList.length >
            0 ? (
              <Grid item>
                <ValidationErrorsCard
                  messages={
                    validateSdfDocumentData?.validateSdfDocument.warningsList
                  }
                  title="Warnings"
                />
              </Grid>
            ) : null}
            {validateSdfDocumentData.validateSdfDocument.errorsList.length ===
              0 &&
            validateSdfDocumentData.validateSdfDocument.warningsList.length ===
              0 ? (
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
