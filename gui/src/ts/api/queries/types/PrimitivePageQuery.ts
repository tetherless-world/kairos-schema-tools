/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EntityType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: PrimitivePageQuery
// ====================================================

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: PrimitivePageQuery_primitiveById_path_sdfDocument_primitive_slot | null;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: PrimitivePageQuery_primitiveById_path_sdfDocument_schema_step_participant | null;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: PrimitivePageQuery_primitiveById_path_sdfDocument_schema_entity | null;
  provenanceDataObject: PrimitivePageQuery_primitiveById_path_sdfDocument_schema_provenanceDataObject | null;
  slot: PrimitivePageQuery_primitiveById_path_sdfDocument_schema_slot | null;
  step: PrimitivePageQuery_primitiveById_path_sdfDocument_schema_step | null;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument_namespacePrefixes {
  __typename: "NamespacePrefix";
  prefix: string;
  uri: string;
}

export interface PrimitivePageQuery_primitiveById_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: PrimitivePageQuery_primitiveById_path_sdfDocument_primitive | null;
  schema: PrimitivePageQuery_primitiveById_path_sdfDocument_schema | null;
  namespacePrefixes: PrimitivePageQuery_primitiveById_path_sdfDocument_namespacePrefixes[] | null;
}

export interface PrimitivePageQuery_primitiveById_path {
  __typename: "DefinitionPath";
  sdfDocument: PrimitivePageQuery_primitiveById_path_sdfDocument;
}

export interface PrimitivePageQuery_primitiveById_slots_entityTypes {
  __typename: "EntityTypes";
  and: boolean;
  entityTypes: EntityType[];
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_primitive_slot | null;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_entity {
  __typename: "DefinitionPathEntity";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathParticipant";
  id: string;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_step_participant | null;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  entity: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_entity | null;
  provenanceDataObject: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_provenanceDataObject | null;
  slot: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_slot | null;
  step: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema_step | null;
}

export interface PrimitivePageQuery_primitiveById_slots_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_primitive | null;
  schema: PrimitivePageQuery_primitiveById_slots_path_sdfDocument_schema | null;
}

export interface PrimitivePageQuery_primitiveById_slots_path {
  __typename: "DefinitionPath";
  sdfDocument: PrimitivePageQuery_primitiveById_slots_path_sdfDocument;
}

export interface PrimitivePageQuery_primitiveById_slots {
  __typename: "PrimitiveSlot";
  aka: string[] | null;
  comments: string[] | null;
  entityTypes: PrimitivePageQuery_primitiveById_slots_entityTypes | null;
  id: string;
  label: string;
  path: PrimitivePageQuery_primitiveById_slots_path;
  privateData: string | null;
  references: string[] | null;
  roleName: string;
  super: string;
}

export interface PrimitivePageQuery_primitiveById {
  __typename: "Primitive";
  aka: string[] | null;
  comments: string[] | null;
  description: string;
  label: string;
  name: string;
  path: PrimitivePageQuery_primitiveById_path;
  privateData: string | null;
  references: string[] | null;
  slots: PrimitivePageQuery_primitiveById_slots[];
  super: string;
  template: string | null;
  version: string;
}

export interface PrimitivePageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  label: string;
}

export interface PrimitivePageQuery {
  primitiveById: PrimitivePageQuery_primitiveById | null;
  sdfDocumentById: PrimitivePageQuery_sdfDocumentById | null;
}

export interface PrimitivePageQueryVariables {
  primitiveId: string;
  sdfDocumentId: string;
}
