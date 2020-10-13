/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DefinitionPathIdsFragment
// ====================================================

export interface DefinitionPathIdsFragment_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface DefinitionPathIdsFragment_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: DefinitionPathIdsFragment_sdfDocument_primitive_slot | null;
}

export interface DefinitionPathIdsFragment_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface DefinitionPathIdsFragment_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface DefinitionPathIdsFragment_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface DefinitionPathIdsFragment_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: DefinitionPathIdsFragment_sdfDocument_schema_step_participant | null;
}

export interface DefinitionPathIdsFragment_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: DefinitionPathIdsFragment_sdfDocument_schema_provenanceDataObject | null;
  slot: DefinitionPathIdsFragment_sdfDocument_schema_slot | null;
  step: DefinitionPathIdsFragment_sdfDocument_schema_step | null;
}

export interface DefinitionPathIdsFragment_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: DefinitionPathIdsFragment_sdfDocument_primitive | null;
  schema: DefinitionPathIdsFragment_sdfDocument_schema | null;
}

export interface DefinitionPathIdsFragment {
  __typename: "DefinitionPath";
  sdfDocument: DefinitionPathIdsFragment_sdfDocument;
}
