import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import * as _ from "lodash";
import * as React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const ValidationMessagesTable: React.FunctionComponent<{
  validationMessages: readonly ValidationMessageFragment[];
}> = ({validationMessages}) => {
  const validationMessagesByType: {
    [index: string]: ValidationMessageFragment[];
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
    <Grid
      container
      data-cy="validation-messages"
      direction="column"
      spacing={8}
    >
      {Object.keys(validationMessagesByType).map((validationMessageType) => {
        const validationMessages =
          validationMessagesByType[validationMessageType];
        return (
          <Grid item key={validationMessageType}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>{`${validationMessageType} (${validationMessages.length})`}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableBody>
                    {validationMessages.map((message, messageIndex) => (
                      <TableRow key={messageIndex.toString()}>
                        <TableCell>{messageIndex + 1}</TableCell>
                        <TableCell
                          data-cy={`${validationMessageType.toLowerCase()}-validation-message-${messageIndex}`}
                          style={{overflowWrap: "break-word"}}
                        >
                          {message.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}
      {_.isEmpty(validationMessagesByType) ? (
        <Grid item>
          <h2 data-cy="no-validation-messages">
            No validation errors detected.
          </h2>
        </Grid>
      ) : null}
    </Grid>
  );
};
