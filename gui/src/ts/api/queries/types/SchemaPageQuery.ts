/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StepOrderFlag, EntityType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SchemaPageQuery
// ====================================================

export interface SchemaPageQuery_schemaById_entityRelations_relations {
  __typename: "EntityRelationRelation";
  relationPredicate: string;
  relationObjects: string[];
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
  flags: StepOrderFlag[] | null;
  after: string[];
  before: string[];
}

export interface SchemaPageQuery_schemaById_order_ContainerContainedStepOrder {
  __typename: "ContainerContainedStepOrder";
  comments: string[] | null;
  flags: StepOrderFlag[] | null;
  contained: string[];
  container: string;
}

export interface SchemaPageQuery_schemaById_order_OverlapsStepOrder {
  __typename: "OverlapsStepOrder";
  comments: string[] | null;
  flags: StepOrderFlag[] | null;
  overlaps: string[];
}

export type SchemaPageQuery_schemaById_order = SchemaPageQuery_schemaById_order_BeforeAfterStepOrder | SchemaPageQuery_schemaById_order_ContainerContainedStepOrder | SchemaPageQuery_schemaById_order_OverlapsStepOrder;

export interface SchemaPageQuery_schemaById_slots {
  __typename: "Slot";
  aka: string[] | null;
  comments: string[] | null;
  entityTypes: EntityType[] | null;
  id: string;
  references: string[] | null;
  refvar: string | null;
  roleName: string;
}

export interface SchemaPageQuery_schemaById_steps_maxDuration {
  __typename: "Duration";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_minDuration {
  __typename: "Duration";
  string: string;
}

export interface SchemaPageQuery_schemaById_steps_participants {
  __typename: "StepParticipant";
  aka: string[] | null;
  comments: string[] | null;
  entityTypes: EntityType[] | null;
  id: string;
  name: string;
  references: string[] | null;
  refvar: string | null;
  role: string;
}

export interface SchemaPageQuery_schemaById_steps {
  __typename: "Step";
  achieves: string[] | null;
  aka: string[] | null;
  comments: string[] | null;
  id: string;
  maxDuration: SchemaPageQuery_schemaById_steps_maxDuration | null;
  minDuration: SchemaPageQuery_schemaById_steps_minDuration | null;
  name: string;
  participants: SchemaPageQuery_schemaById_steps_participants[] | null;
  provenances: string[] | null;
  references: string[] | null;
  requires: string[] | null;
  type: string;
}

export interface SchemaPageQuery_schemaById {
  __typename: "Schema";
  aka: string[] | null;
  comments: string[] | null;
  description: string;
  entityRelations: SchemaPageQuery_schemaById_entityRelations[];
  name: string;
  order: SchemaPageQuery_schemaById_order[];
  references: string[] | null;
  sdfDocumentId: string;
  slots: SchemaPageQuery_schemaById_slots[];
  steps: SchemaPageQuery_schemaById_steps[];
  super: string | null;
  ta2: boolean;
  version: string;
}

export interface SchemaPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  name: string;
}

export interface SchemaPageQuery {
  schemaById: SchemaPageQuery_schemaById | null;
  sdfDocumentById: SchemaPageQuery_sdfDocumentById | null;
}

export interface SchemaPageQueryVariables {
  schemaId: string;
  sdfDocumentId: string;
  withSdfDocument: boolean;
}
