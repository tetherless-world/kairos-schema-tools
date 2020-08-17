/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SchemasPageQuery
// ====================================================

export interface SchemasPageQuery_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  sdfDocumentId: string;
}

export interface SchemasPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  label: string;
}

export interface SchemasPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  label: string;
  schemas: SchemasPageQuery_sdfDocumentById_schemas[];
}

export interface SchemasPageQuery {
  schemas: SchemasPageQuery_schemas[];
  sdfDocumentById: SchemasPageQuery_sdfDocumentById | null;
}

export interface SchemasPageQueryVariables {
  sdfDocumentId: string;
  withSdfDocument: boolean;
}
