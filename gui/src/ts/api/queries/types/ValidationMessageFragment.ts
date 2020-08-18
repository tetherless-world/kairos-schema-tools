/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: ValidationMessageFragment
// ====================================================

export interface ValidationMessageFragment_path_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: ValidationMessageFragment_path_primitive_slot | null;
}

export interface ValidationMessageFragment_path_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: ValidationMessageFragment_path_schema_step_participant | null;
}

export interface ValidationMessageFragment_path_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: ValidationMessageFragment_path_schema_slot | null;
  step: ValidationMessageFragment_path_schema_step | null;
}

export interface ValidationMessageFragment_path {
  __typename: "SdfDocumentPath";
  id: string;
  primitive: ValidationMessageFragment_path_primitive | null;
  schema: ValidationMessageFragment_path_schema | null;
}

export interface ValidationMessageFragment {
  __typename: "ValidationMessage";
  message: string;
  path: ValidationMessageFragment_path;
  type: ValidationMessageType;
}
