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
  __typename: "Slot";
  id: string;
  roleName: string;
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
  name: string;
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
  name: string;
  participants: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants[] | null;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas {
  __typename: "Schema";
  id: string;
  name: string;
  sdfDocumentId: string;
  slots: SdfDocumentSaveMutation_putSdfDocument_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSaveMutation_putSdfDocument_schemas_steps[];
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path {
  __typename: "SchemaPath";
  schemaId: string | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
  stepParticipantId: string | null;
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
  name: string;
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
