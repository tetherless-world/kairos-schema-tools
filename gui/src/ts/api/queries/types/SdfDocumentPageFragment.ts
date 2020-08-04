/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentPageFragment
// ====================================================

export interface SdfDocumentPageFragment_schemas {
  __typename: "Schema";
  id: string;
  name: string;
  sdfDocumentId: string;
}

export interface SdfDocumentPageFragment_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentPageFragment {
  __typename: "SdfDocument";
  id: string;
  name: string;
  schemas: SdfDocumentPageFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentPageFragment_validationMessages[];
}
