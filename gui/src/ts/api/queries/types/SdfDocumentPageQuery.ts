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

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_primitives_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_primitives_path;
  slots: SdfDocumentPageQuery_sdfDocumentById_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData {
  __typename: "ProvenanceDataObject";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_primitive | null;
  schema: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument_schema | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path_sdfDocument;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_temporalObjects {
  __typename: "TemporalObject";
  label: string;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_participants[] | null;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_path;
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_sourceJsonNodeLocation;
  temporalObjects: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list_temporalObjects[] | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas_steps {
  __typename: "Steps";
  list: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_list[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentPageQuery_sdfDocumentById_schemas_path;
  provenanceData: SdfDocumentPageQuery_sdfDocumentById_schemas_provenanceData[] | null;
  slots: SdfDocumentPageQuery_sdfDocumentById_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentPageQuery_sdfDocumentById_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentPageQuery_sdfDocumentById_schemas_steps;
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

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
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
  provenanceDataObject: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentPageQuery_sdfDocumentById_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
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
