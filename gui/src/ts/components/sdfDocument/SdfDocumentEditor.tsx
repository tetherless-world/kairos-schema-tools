import AceEditor from "react-ace";
import ReactAce from "react-ace";
import * as React from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import {JsonNodeLocationFragment} from "api/queries/types/JsonNodeLocationFragment";

export const SdfDocumentEditor: React.FunctionComponent<{
  goToJsonNodeLocation?: JsonNodeLocationFragment;
  onChange?: (sourceJson: string) => void;
  sourceJson: string;
}> = ({goToJsonNodeLocation, onChange, sourceJson}) => {
  const aceEditorRef = React.useCallback(
    (aceEditor: ReactAce) => {
      if (goToJsonNodeLocation) {
        aceEditor.editor.gotoLine(
          goToJsonNodeLocation.line,
          goToJsonNodeLocation.column,
          true
        );
      }
    },
    [goToJsonNodeLocation, sourceJson]
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
        value={sourceJson}
      ></AceEditor>
    </div>
  );
};
