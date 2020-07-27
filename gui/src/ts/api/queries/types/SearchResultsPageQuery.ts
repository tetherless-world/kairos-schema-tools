/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDocumentType } from "./../../graphqlGlobalTypes";

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

export interface SearchResultsPageQuery_search_documents {
  __typename: "SearchDocument";
  id: string;
  label: string;
  schema: SearchResultsPageQuery_search_documents_schema | null;
  schemaId: string | null;
  sdfDocument: SearchResultsPageQuery_search_documents_sdfDocument | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
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
