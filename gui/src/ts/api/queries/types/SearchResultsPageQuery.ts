/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDocumentType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SearchResultsPageQuery
// ====================================================

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  slot: SearchResultsPageQuery_search_documents_path_sdfDocument_primitive_slot | null;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_schema_provenanceDataObject {
  __typename: "DefinitionPathProvenanceDataObject";
  id: string;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  participant: SearchResultsPageQuery_search_documents_path_sdfDocument_schema_step_participant | null;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  provenanceDataObject: SearchResultsPageQuery_search_documents_path_sdfDocument_schema_provenanceDataObject | null;
  slot: SearchResultsPageQuery_search_documents_path_sdfDocument_schema_slot | null;
  step: SearchResultsPageQuery_search_documents_path_sdfDocument_schema_step | null;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SearchResultsPageQuery_search_documents_path_sdfDocument_primitive | null;
  schema: SearchResultsPageQuery_search_documents_path_sdfDocument_schema | null;
}

export interface SearchResultsPageQuery_search_documents_path {
  __typename: "DefinitionPath";
  sdfDocument: SearchResultsPageQuery_search_documents_path_sdfDocument;
}

export interface SearchResultsPageQuery_search_documents {
  __typename: "SearchDocument";
  id: string;
  label: string;
  path: SearchResultsPageQuery_search_documents_path;
  type: SearchDocumentType;
}

export interface SearchResultsPageQuery_search {
  __typename: "SearchResults";
  documents: SearchResultsPageQuery_search_documents[];
  total: number;
}

export interface SearchResultsPageQuery {
  search: SearchResultsPageQuery_search;
}

export interface SearchResultsPageQueryVariables {
  limit: number;
  offset: number;
  query: string;
}
