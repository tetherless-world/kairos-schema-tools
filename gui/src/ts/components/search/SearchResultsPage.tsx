import {useQueryParam} from "use-query-params";
import {useQuery} from "@apollo/react-hooks";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import * as React from "react";

export const SearchResultsPage: React.FunctionComponent = () => {
  const [queryText] = useQueryParam<string>("query");

  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    variables: {limit: 20, offset: 0, text: queryText},
  });

  return (
    <Frame {...query}>
      {({data}) => {
        return <div></div>;
      }}
    </Frame>
  );
};
