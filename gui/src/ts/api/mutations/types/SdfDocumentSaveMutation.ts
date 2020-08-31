/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL mutation operation: SdfDocumentSaveMutation
// ====================================================

export interface SdfDocumentSaveMutation_putSdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_primitives_path;
  slots: SdfDocumentSaveMutation_putSdfDocument_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path_sdfDocument;
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
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path_sdfDocument;
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
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_path;
  slots: SdfDocumentSaveMutation_putSdfDocument_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSaveMutation_putSdfDocument_schemas_steps[];
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument;
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
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_namespacePrefixes[];
  primitives: SdfDocumentSaveMutation_putSdfDocument_primitives[];
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
