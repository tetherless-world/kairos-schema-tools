import AceEditor from "react-ace";
import ReactAce from "react-ace";
import * as React from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";
import {ValidationMessageFragment} from "api/queries/types/ValidationMessageFragment";
import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";
import {getJsonNodeLocationFromDefinitionPath} from "models/definition/getJsonNodeLocationFromDefinitionPath";

export const SdfDocumentSourceEditor: React.FunctionComponent<{
  aceEditorRef: (aceEditor: ReactAce | null | undefined) => void;
  goToJsonNodeLocation?: JsonNodeLocationFragment;
  onChange?: (volatileSourceJson: string) => void;
  savedSdfDocument: SdfDocumentSourceFragment;
  validationMessages: readonly ValidationMessageFragment[];
  volatileSourceJson: string;
}> = ({
  aceEditorRef: aceEditorRefProp,
  goToJsonNodeLocation,
  onChange,
  savedSdfDocument,
  validationMessages,
  volatileSourceJson,
}) => {
  const aceEditorRef = React.useCallback(
    (aceEditor: ReactAce | null | undefined) => {
      aceEditorRefProp(aceEditor);

      if (!aceEditor) {
        return;
      }

      if (goToJsonNodeLocation) {
        aceEditor.editor.gotoLine(
          goToJsonNodeLocation.startToken.line,
          goToJsonNodeLocation.startToken.column,
          true
        );
      }

      aceEditor.editor.setOption("useWorker", false);
      if (validationMessages.length > 0) {
        aceEditor.editor.session.setAnnotations(
          validationMessages.map((validationMessage) => {
            const jsonNodeLocation = validationMessage.path
              ? getJsonNodeLocationFromDefinitionPath(
                  validationMessage.path,
                  savedSdfDocument
                )
              : undefined;
            return {
              column: jsonNodeLocation?.startToken.column,
              row: jsonNodeLocation?.startToken.line,
              text: validationMessage.message,
              type: validationMessage.type.toLowerCase(),
            };
          })
        );
      }
    },
    [goToJsonNodeLocation, validationMessages]
  );

  return (
    <div data-cy="sdf-document-editor">
      <AceEditor
        enableSnippets={false}
        mode="json"
        onChange={onChange}
        ref={aceEditorRef}
        style={{width: "100%"}}
        theme="github"
        value={volatileSourceJson}
      ></AceEditor>
    </div>
  );
};
