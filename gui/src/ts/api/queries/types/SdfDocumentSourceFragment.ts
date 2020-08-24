/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentSourceFragment
// ====================================================

export interface SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives_slots {
  __typename: "PrimitiveSlot";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_primitives_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_primitives {
  __typename: "Primitive";
  id: string;
  label: string;
  slots: SdfDocumentSourceFragment_primitives_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_primitives_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
}

export interface SdfDocumentSourceFragment_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSourceFragment_schemas_path_sdfDocument;
}

export interface SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_slots {
  __typename: "SchemaSlot";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentSourceFragment_schemas_steps_participants[] | null;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentSourceFragment_schemas_path;
  slots: SdfDocumentSourceFragment_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSourceFragment_schemas_steps[];
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
  slot: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSourceFragment_validationMessages_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
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
  primitives: SdfDocumentSourceFragment_primitives[];
  schemas: SdfDocumentSourceFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSourceFragment_validationMessages[];
}
