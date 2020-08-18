/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL mutation operation: SdfDocumentSaveMutation
// ====================================================

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants[] | null;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  sdfDocumentId: string;
  slots: SdfDocumentSaveMutation_putSdfDocument_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSaveMutation_putSdfDocument_schemas_steps[];
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path {
  __typename: "SdfDocumentPath";
  primitive: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  path: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path;
  type: ValidationMessageType;
}

export interface SdfDocumentSaveMutation_putSdfDocument {
  __typename: "SdfDocument";
  id: string;
  label: string;
  schemas: SdfDocumentSaveMutation_putSdfDocument_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSaveMutation_putSdfDocument_validationMessages[];
}

export interface SdfDocumentSaveMutation {
  putSdfDocument: SdfDocumentSaveMutation_putSdfDocument;
}

export interface SdfDocumentSaveMutationVariables {
  json: string;
}
