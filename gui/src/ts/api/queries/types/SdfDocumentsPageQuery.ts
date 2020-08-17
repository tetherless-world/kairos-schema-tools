/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentsPageQuery
// ====================================================

export interface SdfDocumentsPageQuery_sdfDocuments_schemas {
  __typename: "Schema";
  id: string;
  label: string;
}

export interface SdfDocumentsPageQuery_sdfDocuments {
  __typename: "SdfDocument";
  id: string;
  label: string;
  schemas: SdfDocumentsPageQuery_sdfDocuments_schemas[];
  sdfVersion: string;
  validationMessageTypes: ValidationMessageType[];
}

export interface SdfDocumentsPageQuery {
  sdfDocuments: SdfDocumentsPageQuery_sdfDocuments[];
}
