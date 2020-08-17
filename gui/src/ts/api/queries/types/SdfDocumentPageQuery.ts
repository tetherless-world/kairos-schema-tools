/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentPageQuery
// ====================================================

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots {
  __typename: "Slot";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants[] | null;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  sdfDocumentId: string;
  slots: SdfDocumentPageQuery_sdfDocumentById_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentPageQuery_sdfDocumentById_schemas_steps[];
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path {
  __typename: "SchemaPath";
  schemaId: string | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
  stepParticipantId: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  path: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path;
  type: ValidationMessageType;
}

export interface SdfDocumentPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  id: string;
  label: string;
  schemas: SdfDocumentPageQuery_sdfDocumentById_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentPageQuery_sdfDocumentById_validationMessages[];
}

export interface SdfDocumentPageQuery {
  sdfDocumentById: SdfDocumentPageQuery_sdfDocumentById | null;
}

export interface SdfDocumentPageQueryVariables {
  id: string;
}
