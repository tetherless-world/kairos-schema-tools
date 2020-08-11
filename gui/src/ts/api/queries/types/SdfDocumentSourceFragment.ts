/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentSourceFragment
// ====================================================

export interface SdfDocumentSourceFragment_schemas {
  __typename: "Schema";
  id: string;
  name: string;
  sdfDocumentId: string;
}

export interface SdfDocumentSourceFragment_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentSourceFragment {
  __typename: "SdfDocument";
  id: string;
  name: string;
  schemas: SdfDocumentSourceFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSourceFragment_validationMessages[];
}
