/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentSourcePageQuery
// ====================================================

export interface SdfDocumentSourcePageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  name: string;
  sdfDocumentId: string;
}

export interface SdfDocumentSourcePageQuery_sdfDocumentById_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentSourcePageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  id: string;
  name: string;
  schemas: SdfDocumentSourcePageQuery_sdfDocumentById_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSourcePageQuery_sdfDocumentById_validationMessages[];
}

export interface SdfDocumentSourcePageQuery {
  sdfDocumentById: SdfDocumentSourcePageQuery_sdfDocumentById | null;
}

export interface SdfDocumentSourcePageQueryVariables {
  id: string;
}
