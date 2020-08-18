/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SdfDocumentPathFragment
// ====================================================

export interface SdfDocumentPathFragment_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPathFragment_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPathFragment_primitive_slot | null;
}

export interface SdfDocumentPathFragment_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPathFragment_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPathFragment_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPathFragment_schema_step_participant | null;
}

export interface SdfDocumentPathFragment_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPathFragment_schema_slot | null;
  step: SdfDocumentPathFragment_schema_step | null;
}

export interface SdfDocumentPathFragment {
  __typename: "SdfDocumentPath";
  primitive: SdfDocumentPathFragment_primitive | null;
  schema: SdfDocumentPathFragment_schema | null;
}
