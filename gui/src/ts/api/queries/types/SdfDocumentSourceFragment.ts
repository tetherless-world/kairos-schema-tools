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
  sdfDocumentId: string;
  slots: SdfDocumentSourceFragment_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSourceFragment_schemas_steps[];
}

export interface SdfDocumentSourceFragment_validationMessages_path_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSourceFragment_validationMessages_path_primitive_slot | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSourceFragment_validationMessages_path_schema_step_participant | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSourceFragment_validationMessages_path_schema_slot | null;
  step: SdfDocumentSourceFragment_validationMessages_path_schema_step | null;
}

export interface SdfDocumentSourceFragment_validationMessages_path {
  __typename: "SdfDocumentPath";
  id: string;
  primitive: SdfDocumentSourceFragment_validationMessages_path_primitive | null;
  schema: SdfDocumentSourceFragment_validationMessages_path_schema | null;
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
