/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SchemaPathFragment
// ====================================================

export interface SchemaPathFragment_schema {
  __typename: "Schema";
  name: string;
}

export interface SchemaPathFragment_sdfDocument {
  __typename: "SdfDocument";
  name: string;
}

export interface SchemaPathFragment {
  __typename: "SchemaPath";
  schema: SchemaPathFragment_schema | null;
  schemaId: string | null;
  sdfDocument: SchemaPathFragment_sdfDocument | null;
  sdfDocumentId: string | null;
  slotId: string | null;
  stepId: string | null;
}
