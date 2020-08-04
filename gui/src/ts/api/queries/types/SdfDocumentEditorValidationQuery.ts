/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentEditorValidationQuery
// ====================================================

export interface SdfDocumentEditorValidationQuery_validateSdfDocument {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentEditorValidationQuery {
  validateSdfDocument: SdfDocumentEditorValidationQuery_validateSdfDocument[];
}

export interface SdfDocumentEditorValidationQueryVariables {
  json: string;
}
