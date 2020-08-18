/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDocumentType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SearchResultsPageQuery
// ====================================================

export interface SearchResultsPageQuery_search_documents_path_primitive_slot {
  __typename: "SdfDocumentPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SearchResultsPageQuery_search_documents_path_primitive {
  __typename: "SdfDocumentPathPrimitive";
  id: string;
  label: string | null;
  slot: SearchResultsPageQuery_search_documents_path_primitive_slot | null;
}

export interface SearchResultsPageQuery_search_documents_path_schema_slot {
  __typename: "SdfDocumentPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SearchResultsPageQuery_search_documents_path_schema_step_participant {
  __typename: "SdfDocumentPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SearchResultsPageQuery_search_documents_path_schema_step {
  __typename: "SdfDocumentPathStep";
  id: string;
  label: string | null;
  participant: SearchResultsPageQuery_search_documents_path_schema_step_participant | null;
}

export interface SearchResultsPageQuery_search_documents_path_schema {
  __typename: "SdfDocumentPathSchema";
  id: string;
  label: string | null;
  slot: SearchResultsPageQuery_search_documents_path_schema_slot | null;
  step: SearchResultsPageQuery_search_documents_path_schema_step | null;
}

export interface SearchResultsPageQuery_search_documents_path {
  __typename: "SdfDocumentPath";
  id: string;
  primitive: SearchResultsPageQuery_search_documents_path_primitive | null;
  schema: SearchResultsPageQuery_search_documents_path_schema | null;
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
