import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {SdfDocumentEditorQuery_validateSdfDocument} from "api/queries/types/SdfDocumentEditorQuery";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import {ValidationMessageType} from "api/graphqlGlobalTypes";
import * as _ from "lodash";
import * as React from "react";

const ValidationMessagesCard: React.FunctionComponent<{
  messages: ValidationMessageFragment[];
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

export const ValidationMessagesTable: React.FunctionComponent<{
  validationMessages: ValidationMessageFragment[];
}> = ({validationMessages}) => {
  const validationMessagesByType: {
    [index: string]: SdfDocumentEditorQuery_validateSdfDocument[];
  } = {};
  for (const validationMessage of validationMessages) {
    let validationMessagesForType =
      validationMessagesByType[validationMessage.type];
    if (!validationMessagesForType) {
      validationMessagesForType = validationMessagesByType[
        validationMessage.type
      ] = [];
    }
    validationMessagesForType.push(validationMessage);
  }

  return (
    <Grid container direction="column" spacing={8}>
      {validationMessagesByType[ValidationMessageType.Fatal] ? (
        <Grid item>
          <ValidationMessagesCard
            messages={validationMessagesByType[ValidationMessageType.Fatal]}
            title="Fatal"
          />
        </Grid>
      ) : null}
      {validationMessagesByType[ValidationMessageType.Error] ? (
        <Grid item>
          <ValidationMessagesCard
            messages={validationMessagesByType[ValidationMessageType.Error]}
            title="Errors"
          />
        </Grid>
      ) : null}
      {validationMessagesByType[ValidationMessageType.Warning] ? (
        <Grid item>
          <ValidationMessagesCard
            messages={validationMessagesByType[ValidationMessageType.Warning]}
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
  );
};