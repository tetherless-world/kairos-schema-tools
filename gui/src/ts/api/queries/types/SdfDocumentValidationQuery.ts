/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentValidationQuery
// ====================================================

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_slot | null;
  step: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_primitive | null;
  schema: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument_schema | null;
}

export interface SdfDocumentValidationQuery_validateSdfDocument_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentValidationQuery_validateSdfDocument_path_sdfDocument;
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
