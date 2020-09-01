/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SchemasPageQuery
// ====================================================

export interface SchemasPageQuery_schemas_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SchemasPageQuery_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SchemasPageQuery_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SchemasPageQuery_schemas_path_sdfDocument_schema_slot | null;
  step: SchemasPageQuery_schemas_path_sdfDocument_schema_step | null;
}

export interface SchemasPageQuery_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: SchemasPageQuery_schemas_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SchemasPageQuery_schemas_path_sdfDocument_primitive | null;
  schema: SchemasPageQuery_schemas_path_sdfDocument_schema | null;
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

export interface SchemasPageQuery {
  schemas: SchemasPageQuery_schemas[];
}
