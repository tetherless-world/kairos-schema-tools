/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: JsonNodeLocationFragment
// ====================================================

export interface JsonNodeLocationFragment_startToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface JsonNodeLocationFragment_stopToken {
  __typename: "JsonTokenLocation";
  column: number;
  startIndex: number;
  stopIndex: number;
  line: number;
}

export interface JsonNodeLocationFragment {
  __typename: "JsonNodeLocation";
  startToken: JsonNodeLocationFragment_startToken;
  stopToken: JsonNodeLocationFragment_stopToken;
}
