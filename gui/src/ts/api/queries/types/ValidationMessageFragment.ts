/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: ValidationMessageFragment
// ====================================================

export interface ValidationMessageFragment_path {
  __typename: "SchemaPath";
  schemaId: string | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
  stepParticipantId: string | null;
}

export interface ValidationMessageFragment {
  __typename: "ValidationMessage";
  message: string;
  path: ValidationMessageFragment_path;
  type: ValidationMessageType;
}
