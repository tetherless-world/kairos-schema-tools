import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";

export const SdfDocumentPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId: string}>();
  sdfDocumentId = decodeURIComponent(sdfDocumentId);
  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    variables: {id: sdfDocumentId},
  });

  return (
    <Frame {...query}>
      {({data}) => {
        const sdfDocument = Object.assign({}, data.sdfDocumentById, {
          id: sdfDocumentId,
        });
        return (
          <StandardLayout
            breadcrumbs={{sdfDocument}}
            title="Schema Data Format Document"
          >
            <div data-cy="sdf-document-card"></div>
            <SdfDocumentCard {...sdfDocument} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
