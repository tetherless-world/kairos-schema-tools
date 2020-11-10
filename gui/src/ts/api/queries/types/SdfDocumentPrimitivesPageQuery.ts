/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SdfDocumentPrimitivesPageQuery
// ====================================================

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path_sdfDocument;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives_path;
}

export interface SdfDocumentPrimitivesPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  label: string;
  namespacePrefixes: SdfDocumentPrimitivesPageQuery_sdfDocumentById_namespacePrefixes[];
  primitives: SdfDocumentPrimitivesPageQuery_sdfDocumentById_primitives[];
}

export interface SdfDocumentPrimitivesPageQuery {
  sdfDocumentById: SdfDocumentPrimitivesPageQuery_sdfDocumentById | null;
}

export interface SdfDocumentPrimitivesPageQueryVariables {
  sdfDocumentId: string;
}
