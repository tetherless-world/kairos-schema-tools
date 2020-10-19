/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentSourceFragment
// ====================================================

export interface SdfDocumentSourceFragment_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_primitives_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_primitives_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_primitives_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_primitives_slots_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_primitives_slots_path;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_primitives_path;
  slots: SdfDocumentSourceFragment_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_provenanceData_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_provenanceData {
  __typename: "ProvenanceDataObject";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_schemas_provenanceData_path;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_provenanceData_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_schemas_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_schemas_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_slots_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_schemas_slots_path;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_steps_list_participants_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_schemas_steps_list_participants_path;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_list_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_steps_list_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_steps_list_temporalObjects {
  __typename: "TemporalObject";
  label: string;
}

export interface SdfDocumentSourceFragment_schemas_steps_list {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentSourceFragment_schemas_steps_list_participants[] | null;
  path: SdfDocumentSourceFragment_schemas_steps_list_path;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_list_sourceJsonNodeLocation;
  temporalObjects: SdfDocumentSourceFragment_schemas_steps_list_temporalObjects[] | null;
}

export interface SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSourceFragment_schemas_steps {
  __typename: "Steps";
  list: SdfDocumentSourceFragment_schemas_steps_list[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_schemas_path;
  provenanceData: SdfDocumentSourceFragment_schemas_provenanceData[] | null;
  slots: SdfDocumentSourceFragment_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSourceFragment_schemas_steps;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  provenanceDataObject: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_primitive | null;
  schema: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_validationMessages_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  path: SdfDocumentSourceFragment_validationMessages_path;
  type: ValidationMessageType;
}

export interface SdfDocumentSourceFragment {
  __typename: "SdfDocument";
  id: string;
  label: string;
  namespacePrefixes: SdfDocumentSourceFragment_namespacePrefixes[];
  primitives: SdfDocumentSourceFragment_primitives[];
  schemas: SdfDocumentSourceFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSourceFragment_validationMessages[];
}
