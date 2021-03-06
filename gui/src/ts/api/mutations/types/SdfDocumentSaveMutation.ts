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

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_primitives_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_primitives_path;
  slots: SdfDocumentSaveMutation_putSdfDocument_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_entity | null;
  id: string;
  label: string | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
  namespacePrefixes: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_namespacePrefixes[] | null;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_entities {
  __typename: "Entity";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_entities_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_order {
  __typename: "BeforeAfterOrder" | "ContainerContainedOrder" | "OverlapsOrder";
  id: string | null;
  label: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData {
  __typename: "ProvenanceDataObject";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants {
  __typename: "Participant";
  id: string;
  label: string;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_entity | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_primitive | null;
  schema: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument_schema | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path_sdfDocument;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_temporalObjects {
  __typename: "TemporalObject";
  label: string;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_participants[] | null;
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_path;
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_sourceJsonNodeLocation;
  temporalObjects: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list_temporalObjects[] | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  startToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation_startToken;
  stopToken: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation_stopToken;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas_steps {
  __typename: "Steps";
  list: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_list[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSaveMutation_putSdfDocument_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  entities: SdfDocumentSaveMutation_putSdfDocument_schemas_entities[] | null;
  order: SdfDocumentSaveMutation_putSdfDocument_schemas_order[];
  path: SdfDocumentSaveMutation_putSdfDocument_schemas_path;
  provenanceData: SdfDocumentSaveMutation_putSdfDocument_schemas_provenanceData[] | null;
  slots: SdfDocumentSaveMutation_putSdfDocument_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSaveMutation_putSdfDocument_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSaveMutation_putSdfDocument_schemas_steps;
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

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
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
  entity: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_entity | null;
  id: string;
  label: string | null;
  provenanceDataObject: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSaveMutation_putSdfDocument_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  label: string | null;
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
  task2: boolean | null;
  validationMessages: SdfDocumentSaveMutation_putSdfDocument_validationMessages[];
}

export interface SdfDocumentSaveMutation {
  putSdfDocument: SdfDocumentSaveMutation_putSdfDocument;
}

export interface SdfDocumentSaveMutationVariables {
  json: string;
}
