/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentFragment
// ====================================================

export interface SdfDocumentFragment_schemas {
  __typename: "Schema";
  id: string;
  name: string;
}

export interface SdfDocumentFragment_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentFragment {
  __typename: "SdfDocument";
  name: string;
  schemas: SdfDocumentFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentFragment_validationMessages[];
}
