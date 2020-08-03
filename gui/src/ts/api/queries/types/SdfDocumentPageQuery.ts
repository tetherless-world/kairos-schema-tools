/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentPageQuery
// ====================================================

export interface SdfDocumentPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  name: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  type: ValidationMessageType;
}

export interface SdfDocumentPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  name: string;
  schemas: SdfDocumentPageQuery_sdfDocumentById_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentPageQuery_sdfDocumentById_validationMessages[];
}

export interface SdfDocumentPageQuery {
  sdfDocumentById: SdfDocumentPageQuery_sdfDocumentById | null;
}

export interface SdfDocumentPageQueryVariables {
  id: string;
}
