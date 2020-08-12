/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDocumentType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL query operation: SearchResultsPageQuery
// ====================================================

export interface SearchResultsPageQuery_search_documents_path_schema {
  __typename: "Schema";
  name: string;
}

export interface SearchResultsPageQuery_search_documents_path_sdfDocument {
  __typename: "SdfDocument";
  name: string;
}

export interface SearchResultsPageQuery_search_documents_path {
  __typename: "SchemaPath";
  schema: SearchResultsPageQuery_search_documents_path_schema | null;
  schemaId: string | null;
  sdfDocument: SearchResultsPageQuery_search_documents_path_sdfDocument | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
  stepParticipantId: string | null;
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
