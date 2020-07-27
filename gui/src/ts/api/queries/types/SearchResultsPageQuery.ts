/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResultsPageQuery
// ====================================================

export interface SearchResultsPageQuery_search_documents_schema {
  __typename: "Schema";
  name: string;
}

export interface SearchResultsPageQuery_search_documents_sdfDocument {
  __typename: "SdfDocument";
  name: string;
}

export interface SearchResultsPageQuery_search_documents_slot {
  __typename: "Slot";
  roleName: string;
}

export interface SearchResultsPageQuery_search_documents_step {
  __typename: "Step";
  name: string;
}

export interface SearchResultsPageQuery_search_documents {
  __typename: "SearchDocument";
  schema: SearchResultsPageQuery_search_documents_schema | null;
  schemaId: string | null;
  sdfDocument: SearchResultsPageQuery_search_documents_sdfDocument | null;
  sdfDocumentId: string;
  slot: SearchResultsPageQuery_search_documents_slot | null;
  slotId: string | null;
  step: SearchResultsPageQuery_search_documents_step | null;
  stepId: string | null;
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
