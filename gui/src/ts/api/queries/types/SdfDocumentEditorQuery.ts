/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SdfDocumentEditorQuery
// ====================================================

export interface SdfDocumentEditorQuery_validateSdfDocument {
  __typename: "KsfValidationResults";
  errorsList: string[];
  warningsList: string[];
}

export interface SdfDocumentEditorQuery {
  validateSdfDocument: SdfDocumentEditorQuery_validateSdfDocument;
}

export interface SdfDocumentEditorQueryVariables {
  json: string;
}
