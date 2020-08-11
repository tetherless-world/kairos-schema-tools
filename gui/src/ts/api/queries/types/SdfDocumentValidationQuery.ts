/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentValidationQuery
// ====================================================

export interface SdfDocumentValidationQuery_validateSdfDocument {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentValidationQuery {
  validateSdfDocument: SdfDocumentValidationQuery_validateSdfDocument[];
}

export interface SdfDocumentValidationQueryVariables {
  json: string;
}
