/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentValidationQuery
// ====================================================

export interface SdfDocumentValidationQuery_validateSdfDocument_path_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentValidationQuery_validateSdfDocument_path_primitive_slot | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentValidationQuery_validateSdfDocument_path_schema_step_participant | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentValidationQuery_validateSdfDocument_path_schema_slot | null;
  step: SdfDocumentValidationQuery_validateSdfDocument_path_schema_step | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path {
  __typename: "SdfDocumentPath";
  id: string;
  primitive: SdfDocumentValidationQuery_validateSdfDocument_path_primitive | null;
  schema: SdfDocumentValidationQuery_validateSdfDocument_path_schema | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument {
  __typename: "ValidationMessage";
  message: string;
  path: SdfDocumentValidationQuery_validateSdfDocument_path;
  type: ValidationMessageType;
}

export interface SdfDocumentValidationQuery {
  validateSdfDocument: SdfDocumentValidationQuery_validateSdfDocument[];
}

export interface SdfDocumentValidationQueryVariables {
  json: string;
}
