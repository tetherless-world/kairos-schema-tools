/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SdfDocumentPageQuery
// ====================================================

export interface SdfDocumentPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  name: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  schemas: SdfDocumentPageQuery_sdfDocumentById_schemas[];
}

export interface SdfDocumentPageQuery {
  sdfDocumentById: SdfDocumentPageQuery_sdfDocumentById | null;
}

export interface SdfDocumentPageQueryVariables {
  id: string;
}
