/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DefinitionPathFragment
// ====================================================

export interface DefinitionPathFragment_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: DefinitionPathFragment_primitive_slot | null;
}

export interface DefinitionPathFragment_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface DefinitionPathFragment_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: DefinitionPathFragment_schema_step_participant | null;
}

export interface DefinitionPathFragment_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: DefinitionPathFragment_schema_slot | null;
  step: DefinitionPathFragment_schema_step | null;
}

export interface DefinitionPathFragment {
  __typename: "DefinitionPath";
  id: string;
  primitive: DefinitionPathFragment_primitive | null;
  schema: DefinitionPathFragment_schema | null;
}
