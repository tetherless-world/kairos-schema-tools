/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimitivesPageQuery
// ====================================================

export interface PrimitivesPageQuery_primitives_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: PrimitivesPageQuery_primitives_path_sdfDocument_primitive_slot | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: PrimitivesPageQuery_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: PrimitivesPageQuery_primitives_path_sdfDocument_schema_slot | null;
  step: PrimitivesPageQuery_primitives_path_sdfDocument_schema_step | null;
}

export interface PrimitivesPageQuery_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: PrimitivesPageQuery_primitives_path_sdfDocument_namespacePrefixes[] | null;
  primitive: PrimitivesPageQuery_primitives_path_sdfDocument_primitive | null;
  schema: PrimitivesPageQuery_primitives_path_sdfDocument_schema | null;
}

export interface PrimitivesPageQuery_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: PrimitivesPageQuery_primitives_path_sdfDocument;
}

export interface PrimitivesPageQuery_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: PrimitivesPageQuery_primitives_path;
}

export interface PrimitivesPageQuery {
  primitives: PrimitivesPageQuery_primitives[];
}
