/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL mutation operation: SdfDocumentEditorSaveMutation
// ====================================================

export interface SdfDocumentEditorSaveMutation_putSdfDocument_schemas {
  __typename: "Schema";
  id: string;
  name: string;
  sdfDocumentId: string;
}

export interface SdfDocumentEditorSaveMutation_putSdfDocument_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentEditorSaveMutation_putSdfDocument {
  __typename: "SdfDocument";
  id: string;
  name: string;
  schemas: SdfDocumentEditorSaveMutation_putSdfDocument_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentEditorSaveMutation_putSdfDocument_validationMessages[];
}

export interface SdfDocumentEditorSaveMutation {
  putSdfDocument: SdfDocumentEditorSaveMutation_putSdfDocument;
}

export interface SdfDocumentEditorSaveMutationVariables {
  json: string;
}
