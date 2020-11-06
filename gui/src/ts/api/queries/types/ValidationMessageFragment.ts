/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: ValidationMessageFragment
// ====================================================

export interface ValidationMessageFragment_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface ValidationMessageFragment_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: ValidationMessageFragment_path_sdfDocument_primitive_slot | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: ValidationMessageFragment_path_sdfDocument_schema_step_participant | null;
}

export interface ValidationMessageFragment_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  entity: ValidationMessageFragment_path_sdfDocument_schema_entity | null;
  id: string;
  label: string | null;
  provenanceDataObject: ValidationMessageFragment_path_sdfDocument_schema_provenanceDataObject | null;
  slot: ValidationMessageFragment_path_sdfDocument_schema_slot | null;
  step: ValidationMessageFragment_path_sdfDocument_schema_step | null;
}

export interface ValidationMessageFragment_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: ValidationMessageFragment_path_sdfDocument_namespacePrefixes[] | null;
  primitive: ValidationMessageFragment_path_sdfDocument_primitive | null;
  schema: ValidationMessageFragment_path_sdfDocument_schema | null;
}

export interface ValidationMessageFragment_path {
  __typename: "DefinitionPath";
  sdfDocument: ValidationMessageFragment_path_sdfDocument;
}

export interface ValidationMessageFragment {
  __typename: "ValidationMessage";
  message: string;
  path: ValidationMessageFragment_path;
  type: ValidationMessageType;
}
