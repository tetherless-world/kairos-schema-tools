/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SdfDocumentPageQuery
// ====================================================

export interface SdfDocumentPageQuery_sdfDocumentById_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_primitives_path;
  slots: SdfDocumentPageQuery_sdfDocumentById_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path_sdfDocument;
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
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path_sdfDocument;
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
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_path;
  slots: SdfDocumentPageQuery_sdfDocumentById_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentPageQuery_sdfDocumentById_schemas_steps[];
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument;
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
  namespacePrefixes: SdfDocumentPageQuery_sdfDocumentById_namespacePrefixes[];
  primitives: SdfDocumentPageQuery_sdfDocumentById_primitives[];
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
