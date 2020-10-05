import {
  ValidationMessageFragment,
  ValidationMessageFragment_path,
} from "api/queries/types/ValidationMessageFragment";
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
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPathLink} from "components/link/DefinitionPathLink";

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
        const isValidationMessagePathEmpty = (
          path: ValidationMessageFragment_path
        ) => {
          // @ts-ignore
          const {sdfDocumentId, ...other} = path;
          return _.isEmpty(other);
        };
        const includePathColumn = validationMessages.some(
          (validationMessage) =>
            !isValidationMessagePathEmpty(validationMessage.path)
        );
        return (
          <Grid item key={validationMessageType}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>{`${validationMessageType} (${validationMessages.length})`}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableBody>
                    {validationMessages.map((message, messageIndex) => {
                      const includePathCells =
                        includePathColumn &&
                        !isValidationMessagePathEmpty(message.path);
                      return (
                        <TableRow key={messageIndex.toString()}>
                          <TableCell>{messageIndex + 1}</TableCell>
                          <TableCell
                            data-cy={`${validationMessageType.toLowerCase()}-validation-message-${messageIndex}`}
                            style={{width: "60%", wordBreak: "break-all"}}
                          >
                            {message.message}
                          </TableCell>
                          {includePathColumn ? (
                            <>
                              <TableCell>
                                {includePathCells ? (
                                  <DefinitionPathLink path={message.path} />
                                ) : null}
                              </TableCell>
                              <TableCell>
                                {includePathCells ? (
                                  <SdfDocumentSourceLink to={message.path} />
                                ) : null}
                              </TableCell>
                            </>
                          ) : null}
                        </TableRow>
                      );
                    })}
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
