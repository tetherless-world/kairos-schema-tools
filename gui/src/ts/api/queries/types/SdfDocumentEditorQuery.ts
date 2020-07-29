/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentEditorQuery
// ====================================================

export interface SdfDocumentEditorQuery_validateSdfDocument {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentEditorQuery {
  validateSdfDocument: SdfDocumentEditorQuery_validateSdfDocument[];
}

export interface SdfDocumentEditorQueryVariables {
  json: string;
}
