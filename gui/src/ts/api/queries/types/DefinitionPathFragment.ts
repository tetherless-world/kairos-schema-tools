/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DefinitionPathFragment
// ====================================================

export interface DefinitionPathFragment_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface DefinitionPathFragment_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: DefinitionPathFragment_sdfDocument_primitive_slot | null;
}

export interface DefinitionPathFragment_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: DefinitionPathFragment_sdfDocument_schema_step_participant | null;
}

export interface DefinitionPathFragment_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  entity: DefinitionPathFragment_sdfDocument_schema_entity | null;
  id: string;
  label: string | null;
  provenanceDataObject: DefinitionPathFragment_sdfDocument_schema_provenanceDataObject | null;
  slot: DefinitionPathFragment_sdfDocument_schema_slot | null;
  step: DefinitionPathFragment_sdfDocument_schema_step | null;
}

export interface DefinitionPathFragment_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: DefinitionPathFragment_sdfDocument_namespacePrefixes[] | null;
  primitive: DefinitionPathFragment_sdfDocument_primitive | null;
  schema: DefinitionPathFragment_sdfDocument_schema | null;
}

export interface DefinitionPathFragment {
  __typename: "DefinitionPath";
  sdfDocument: DefinitionPathFragment_sdfDocument;
}
