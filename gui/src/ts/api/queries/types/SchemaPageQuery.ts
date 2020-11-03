/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Modality, StepOrderFlag, EntityType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SchemaPageQuery
// ====================================================

export interface SchemaPageQuery_schemaById_entityRelations_relations {
  __typename: "EntityRelationRelation";
  confidence: number | null;
  id: string | null;
  modalities: Modality[] | null;
  name: string | null;
  provenances: string[] | null;
  references: string[] | null;
  relationProvenance: string | null;
  relationPredicate: string;
  relationObjects: string[];
  ta1ref: string | null;
}

export interface SchemaPageQuery_schemaById_entityRelations {
  __typename: "EntityRelation";
  comments: string[] | null;
  relations: SchemaPageQuery_schemaById_entityRelations_relations[];
  relationSubject: string;
}

export interface SchemaPageQuery_schemaById_order_BeforeAfterStepOrder {
  __typename: "BeforeAfterStepOrder";
  comments: string[] | null;
  confidence: number | null;
  flags: StepOrderFlag[] | null;
  id: string | null;
  label: string;
  provenances: string[] | null;
  ta1ref: string | null;
  after: string[];
  before: string[];
}

export interface SchemaPageQuery_schemaById_order_ContainerContainedStepOrder {
  __typename: "ContainerContainedStepOrder";
  comments: string[] | null;
  confidence: number | null;
  flags: StepOrderFlag[] | null;
  id: string | null;
  label: string;
  provenances: string[] | null;
  ta1ref: string | null;
  contained: string[];
  container: string;
}

export interface SchemaPageQuery_schemaById_order_OverlapsStepOrder {
  __typename: "OverlapsStepOrder";
  comments: string[] | null;
  confidence: number | null;
  flags: StepOrderFlag[] | null;
  id: string | null;
  label: string;
  provenances: string[] | null;
  ta1ref: string | null;
  overlaps: string[];
}

export type SchemaPageQuery_schemaById_order = SchemaPageQuery_schemaById_order_BeforeAfterStepOrder | SchemaPageQuery_schemaById_order_ContainerContainedStepOrder | SchemaPageQuery_schemaById_order_OverlapsStepOrder;

export interface SchemaPageQuery_schemaById_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SchemaPageQuery_schemaById_path_sdfDocument_primitive_slot | null;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SchemaPageQuery_schemaById_path_sdfDocument_schema_step_participant | null;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SchemaPageQuery_schemaById_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SchemaPageQuery_schemaById_path_sdfDocument_schema_slot | null;
  step: SchemaPageQuery_schemaById_path_sdfDocument_schema_step | null;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface SchemaPageQuery_schemaById_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SchemaPageQuery_schemaById_path_sdfDocument_primitive | null;
  schema: SchemaPageQuery_schemaById_path_sdfDocument_schema | null;
  namespacePrefixes: SchemaPageQuery_schemaById_path_sdfDocument_namespacePrefixes[] | null;
}

export interface SchemaPageQuery_schemaById_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemaPageQuery_schemaById_path_sdfDocument;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_primitive_slot | null;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_step_participant | null;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_slot | null;
  step: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema_step | null;
}

export interface SchemaPageQuery_schemaById_provenanceData_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_primitive | null;
  schema: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument_schema | null;
}

export interface SchemaPageQuery_schemaById_provenanceData_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemaPageQuery_schemaById_provenanceData_path_sdfDocument;
}

export interface SchemaPageQuery_schemaById_provenanceData {
  __typename: "ProvenanceDataObject";
  boundingBox: number[] | null;
  childId: string;
  comments: string[] | null;
  endTime: number | null;
  id: string;
  keyframes: number[] | null;
  label: string;
  length: number | null;
  mediaType: string;
  offset: number | null;
  parentIds: string[] | null;
  path: SchemaPageQuery_schemaById_provenanceData_path;
  privateData: string | null;
  startTime: number | null;
}

export interface SchemaPageQuery_schemaById_slots_entityTypes {
  __typename: "EntityTypes";
  and: boolean;
  entityTypes: EntityType[];
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SchemaPageQuery_schemaById_slots_path_sdfDocument_primitive_slot | null;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_step_participant | null;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_slot | null;
  step: SchemaPageQuery_schemaById_slots_path_sdfDocument_schema_step | null;
}

export interface SchemaPageQuery_schemaById_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SchemaPageQuery_schemaById_slots_path_sdfDocument_primitive | null;
  schema: SchemaPageQuery_schemaById_slots_path_sdfDocument_schema | null;
}

export interface SchemaPageQuery_schemaById_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemaPageQuery_schemaById_slots_path_sdfDocument;
}

export interface SchemaPageQuery_schemaById_slots {
  __typename: "SchemaSlot";
  aka: string[] | null;
  comments: string[] | null;
  entityTypes: SchemaPageQuery_schemaById_slots_entityTypes | null;
  id: string;
  label: string;
  path: SchemaPageQuery_schemaById_slots_path;
  privateData: string | null;
  references: string[] | null;
  refvar: string | null;
  roleName: string;
}

export interface SchemaPageQuery_schemaById_steps_list_maxDuration {
  __typename: "Duration";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_minDuration {
  __typename: "Duration";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_entityTypes {
  __typename: "EntityTypes";
  and: boolean;
  entityTypes: EntityType[];
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_primitive_slot | null;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_step_participant | null;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_slot | null;
  step: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema_step | null;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_primitive | null;
  schema: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument_schema | null;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemaPageQuery_schemaById_steps_list_participants_path_sdfDocument;
}

export interface SchemaPageQuery_schemaById_steps_list_participants_values_entityTypes {
  __typename: "EntityTypes";
  and: boolean;
  entityTypes: EntityType[];
}

export interface SchemaPageQuery_schemaById_steps_list_participants_values {
  __typename: "StepParticipantValue";
  comments: string[] | null;
  confidence: number;
  entityTypes: SchemaPageQuery_schemaById_steps_list_participants_values_entityTypes;
  label: string;
  modalities: Modality[] | null;
  name: string;
  privateData: string | null;
  provenances: string[];
}

export interface SchemaPageQuery_schemaById_steps_list_participants {
  __typename: "StepParticipant";
  aka: string[] | null;
  comments: string[] | null;
  entityTypes: SchemaPageQuery_schemaById_steps_list_participants_entityTypes | null;
  id: string;
  label: string;
  name: string;
  path: SchemaPageQuery_schemaById_steps_list_participants_path;
  privateData: string | null;
  references: string[] | null;
  refvar: string | null;
  role: string;
  values: SchemaPageQuery_schemaById_steps_list_participants_values[] | null;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_primitive_slot | null;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_step_participant | null;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_slot | null;
  step: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema_step | null;
}

export interface SchemaPageQuery_schemaById_steps_list_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_primitive | null;
  schema: SchemaPageQuery_schemaById_steps_list_path_sdfDocument_schema | null;
}

export interface SchemaPageQuery_schemaById_steps_list_path {
  __typename: "DefinitionPath";
  sdfDocument: SchemaPageQuery_schemaById_steps_list_path_sdfDocument;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_absoluteTime {
  __typename: "DateTime";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_duration {
  __typename: "Duration";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_earliestEndTime {
  __typename: "DateTime";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_earliestStartTime {
  __typename: "DateTime";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_latestEndTime {
  __typename: "DateTime";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects_latestStartTime {
  __typename: "DateTime";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_list_temporalObjects {
  __typename: "TemporalObject";
  absoluteTime: SchemaPageQuery_schemaById_steps_list_temporalObjects_absoluteTime | null;
  comments: string[] | null;
  confidence: number;
  duration: SchemaPageQuery_schemaById_steps_list_temporalObjects_duration | null;
  earliestEndTime: SchemaPageQuery_schemaById_steps_list_temporalObjects_earliestEndTime | null;
  earliestStartTime: SchemaPageQuery_schemaById_steps_list_temporalObjects_earliestStartTime | null;
  label: string;
  latestEndTime: SchemaPageQuery_schemaById_steps_list_temporalObjects_latestEndTime | null;
  latestStartTime: SchemaPageQuery_schemaById_steps_list_temporalObjects_latestStartTime | null;
  provenances: string[] | null;
}

export interface SchemaPageQuery_schemaById_steps_list {
  __typename: "Step";
  achieves: string[] | null;
  aka: string[] | null;
  comments: string[] | null;
  confidence: number | null;
  id: string;
  label: string;
  maxDuration: SchemaPageQuery_schemaById_steps_list_maxDuration | null;
  minDuration: SchemaPageQuery_schemaById_steps_list_minDuration | null;
  modalities: Modality[] | null;
  name: string;
  participants: SchemaPageQuery_schemaById_steps_list_participants[] | null;
  path: SchemaPageQuery_schemaById_steps_list_path;
  privateData: string | null;
  provenances: string[] | null;
  references: string[] | null;
  requires: string[] | null;
  ta1ref: string | null;
  temporalObjects: SchemaPageQuery_schemaById_steps_list_temporalObjects[] | null;
  type: string;
}

export interface SchemaPageQuery_schemaById_steps {
  __typename: "Steps";
  list: SchemaPageQuery_schemaById_steps_list[];
}

export interface SchemaPageQuery_schemaById {
  __typename: "Schema";
  aka: string[] | null;
  comments: string[] | null;
  confidence: number | null;
  description: string;
  entityRelations: SchemaPageQuery_schemaById_entityRelations[];
  label: string;
  name: string;
  order: SchemaPageQuery_schemaById_order[];
  path: SchemaPageQuery_schemaById_path;
  privateData: string | null;
  provenanceData: SchemaPageQuery_schemaById_provenanceData[] | null;
  references: string[] | null;
  slots: SchemaPageQuery_schemaById_slots[];
  steps: SchemaPageQuery_schemaById_steps;
  ta2: boolean;
  template: string | null;
  version: string;
}

export interface SchemaPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  label: string;
}

export interface SchemaPageQuery {
  schemaById: SchemaPageQuery_schemaById | null;
  sdfDocumentById: SchemaPageQuery_sdfDocumentById | null;
}

export interface SchemaPageQueryVariables {
  schemaId: string;
  sdfDocumentId: string;
}
