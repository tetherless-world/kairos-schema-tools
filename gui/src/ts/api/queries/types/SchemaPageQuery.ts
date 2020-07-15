/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SchemaPageQuery
// ====================================================

export interface SchemaPageQuery_schemaById {
  __typename: "Schema";
  name: string;
}

export interface SchemaPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  name: string;
}

export interface SchemaPageQuery {
  schemaById: SchemaPageQuery_schemaById | null;
  sdfDocumentById: SchemaPageQuery_sdfDocumentById | null;
}

export interface SchemaPageQueryVariables {
  schemaId: string;
  sdfDocumentId: string;
  withSdfDocument: boolean;
}
