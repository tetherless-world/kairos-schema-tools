/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SchemasPageQuery
// ====================================================

export interface SchemasPageQuery_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
}

export interface SchemasPageQuery_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemasPageQuery_schemas_path_sdfDocument;
}

export interface SchemasPageQuery_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SchemasPageQuery_schemas_path;
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
