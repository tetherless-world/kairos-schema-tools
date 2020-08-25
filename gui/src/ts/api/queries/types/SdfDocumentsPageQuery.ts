/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentsPageQuery
// ====================================================

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentsPageQuery_sdfDocuments_primitives_path_sdfDocument;
}

export interface SdfDocumentsPageQuery_sdfDocuments_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentsPageQuery_sdfDocuments_primitives_path;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentsPageQuery_sdfDocuments_schemas_path_sdfDocument;
}

export interface SdfDocumentsPageQuery_sdfDocuments_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentsPageQuery_sdfDocuments_schemas_path;
}

export interface SdfDocumentsPageQuery_sdfDocuments {
  __typename: "SdfDocument";
  id: string;
  label: string;
  primitives: SdfDocumentsPageQuery_sdfDocuments_primitives[];
  schemas: SdfDocumentsPageQuery_sdfDocuments_schemas[];
  sdfVersion: string;
  validationMessageTypes: ValidationMessageType[];
}

export interface SdfDocumentsPageQuery {
  sdfDocuments: SdfDocumentsPageQuery_sdfDocuments[];
}
