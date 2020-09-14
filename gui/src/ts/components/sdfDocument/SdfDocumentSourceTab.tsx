import * as React from "react";
import {SdfDocumentSourceEditor} from "components/sdfDocument/SdfDocumentSourceEditor";
import {
  SdfDocumentSourceFragment,
  SdfDocumentSourceFragment_primitives,
  SdfDocumentSourceFragment_schemas,
} from "api/queries/types/SdfDocumentSourceFragment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from "@material-ui/core";
import {SdfDocumentValidationQuery_validateSdfDocument} from "api/queries/types/SdfDocumentValidationQuery";
import {ValidationMessagesTable} from "components/validation/ValidationMessagesTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {SchemaTableOfContents} from "components/schema/SchemaTableOfContents";
import {Hrefs} from "Hrefs";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {getJsonNodeLocationFromDefinitionPath} from "models/definition/getJsonNodeLocationFromDefinitionPath";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {PrimitiveTableOfContents} from "components/primitive/PrimitiveTableOfContents";
import ReactAce from "react-ace";

const PrimitiveAccordion: React.FunctionComponent<{
  primitive: SdfDocumentSourceFragment_primitives;
}> = ({primitive}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h3>Primitive: {primitive.label}</h3>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column">
        <Grid item>
          <SdfDocumentSourceLink to={primitive.path} />
        </Grid>
        <Grid item>
          <PrimitiveTableOfContents
            hrefs={Hrefs.sdfDocuments
              .sdfDocument({id: primitive.path.sdfDocument.id})
              .primitives.primitive(primitive)}
            includeSourceLinks={true}
            primitive={primitive}
          />
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const RightPanelAccordion: React.FunctionComponent<React.PropsWithChildren<{
  title: string;
}>> = ({children, title}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h2>{title}</h2>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

const SaveButton: React.FunctionComponent<{onClick: () => void}> = ({
  onClick,
}) => (
  <Button
    color="primary"
    data-cy="save-button"
    onClick={onClick}
    size="large"
    variant="contained"
  >
    Save
  </Button>
);

const SchemaAccordion: React.FunctionComponent<{
  addStep: () => void;
  schema: SdfDocumentSourceFragment_schemas;
}> = ({addStep, schema}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <h3>Schema: {schema.label}</h3>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column">
        <Grid item>
          <SdfDocumentSourceLink to={schema.path} />
        </Grid>
        <Grid item>
          <SchemaTableOfContents
            addStep={addStep}
            hrefs={Hrefs.sdfDocuments
              .sdfDocument({id: schema.path.sdfDocument.id})
              .schemas.schema(schema)}
            includeSourceLinks={true}
            schema={schema}
          />
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const ValidateButton: React.FunctionComponent<{onClick: () => void}> = ({
  onClick,
}) => (
  <Button
    color="secondary"
    data-cy="validate-button"
    onClick={onClick}
    size="large"
    variant="contained"
  >
    Validate
  </Button>
);

export const SdfDocumentSourceTab: React.FunctionComponent<{
  definitionPath?: DefinitionPath;
  onChange: (sourceJson: string) => void;
  onSave: () => void;
  onValidate: () => void;
  savedSdfDocument: SdfDocumentSourceFragment;
  validationMessages: readonly SdfDocumentValidationQuery_validateSdfDocument[];
  volatileSourceJson: string;
}> = ({
  definitionPath,
  onChange,
  onSave,
  onValidate,
  savedSdfDocument,
  validationMessages,
  volatileSourceJson,
}) => {
  const [aceEditor, setAceEditor] = React.useState<ReactAce | null | undefined>(
    null
  );

  return (
    <Grid container data-cy="sdf-document-editor" direction="row" spacing={4}>
      <Grid item xs={8}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <SdfDocumentSourceEditor
              aceEditorRef={setAceEditor}
              goToJsonNodeLocation={
                definitionPath
                  ? getJsonNodeLocationFromDefinitionPath(
                      definitionPath,
                      savedSdfDocument
                    )
                  : undefined
              }
              onChange={onChange}
              savedSdfDocument={savedSdfDocument}
              validationMessages={validationMessages}
              volatileSourceJson={volatileSourceJson!}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={8}>
              <Grid item>
                <SaveButton onClick={onSave} />
              </Grid>
              <Grid item>
                <ValidateButton onClick={onValidate} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <RightPanelAccordion title="Table of contents">
              <Grid container direction="column">
                {savedSdfDocument.primitives.map((primitive) => (
                  <Grid item key={primitive.id}>
                    <PrimitiveAccordion primitive={primitive} />
                  </Grid>
                ))}
                {savedSdfDocument.schemas.map((schema) => {
                  const addStep = () => {
                    if (!aceEditor) {
                      console.error("Ace editor not set");
                      return;
                    }
                    const stepsClosingBracketToken =
                      schema.steps.sourceJsonNodeLocation.stopToken;
                    aceEditor.editor.session.insert(
                      {
                        row: stepsClosingBracketToken.line - 1,
                        column: stepsClosingBracketToken.column - 1,
                      },
                      JSON.stringify(
                        {
                          "@id": "new_identifier_replace_me",
                          name: "New step",
                          "@type": "new_type_replace_me",
                          aka: [],
                          minDuration: "",
                          maxDuration: "",
                          participants: [],
                        },
                        undefined,
                        4
                      )
                    );
                    aceEditor.editor.gotoLine(
                      stepsClosingBracketToken.line,
                      stepsClosingBracketToken.column,
                      false
                    );
                  };
                  return (
                    <Grid item key={schema.id}>
                      <SchemaAccordion addStep={addStep} schema={schema} />
                    </Grid>
                  );
                })}
              </Grid>
            </RightPanelAccordion>
          </Grid>
          <Grid item>
            <RightPanelAccordion
              title={`Validation messages (${validationMessages.length})`}
            >
              <ValidationMessagesTable
                validationMessages={validationMessages}
              />
            </RightPanelAccordion>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
