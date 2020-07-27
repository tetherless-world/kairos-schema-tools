import AceEditor from "react-ace";
import * as React from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

export const SdfDocumentEditor: React.FunctionComponent<{
  sourceJson: string;
}> = ({sourceJson}) => {
  return (
    <AceEditor
      enableSnippets={false}
      mode="json"
      style={{width: "100%"}}
      theme="github"
      value={sourceJson}
    ></AceEditor>
  );
};
