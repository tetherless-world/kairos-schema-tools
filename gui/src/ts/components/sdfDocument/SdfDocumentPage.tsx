import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";

export const SdfDocumentPage: React.FunctionComponent = () => {
  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );
  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    fetchPolicy: "network-only",
    variables: {id: sdfDocumentId},
  });

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.sdfDocumentById) {
          return <NoRoute />;
        }
        const sdfDocument = data.sdfDocumentById;

        return (
          <StandardLayout
            breadcrumbs={{sdfDocument}}
            rowItemStyle={{flexGrow: 1}}
            title={"Schema Data Format Document: " + sdfDocument.name}
            subtitle={sdfDocument.id}
          >
            <SdfDocumentCard
              {...sdfDocument}
              validationMessageTypes={sdfDocument.validationMessages.map(
                (message) => message.type
              )}
            />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
