/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SdfDocumentsPageQuery
// ====================================================

export interface SdfDocumentsPageQuery_sdfDocuments_schemas {
  __typename: "Schema";
  id: string;
  name: string;
}

export interface SdfDocumentsPageQuery_sdfDocuments {
  __typename: "SdfDocument";
  id: string;
  schemas: SdfDocumentsPageQuery_sdfDocuments_schemas[];
}

export interface SdfDocumentsPageQuery {
  sdfDocuments: SdfDocumentsPageQuery_sdfDocuments[];
}
