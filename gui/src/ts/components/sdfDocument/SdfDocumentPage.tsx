import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentEditor} from "components/sdfDocument/SdfDocumentEditor";
import {SdfDocumentSourceFragment} from "api/queries/types/SdfDocumentSourceFragment";

export const SdfDocumentPage: React.FunctionComponent = () => {
  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );
  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    fetchPolicy: "network-only",
    variables: {id: sdfDocumentId},
  });
  const [
    sdfDocument,
    setSdfDocument,
  ] = React.useState<SdfDocumentSourceFragment | null>(null);

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.sdfDocumentById) {
          return <NoRoute />;
        }
        if (sdfDocument === null) {
          setSdfDocument(data.sdfDocumentById);
          return;
        }

        return (
          <StandardLayout
            breadcrumbs={{sdfDocument, sdfDocumentSource: true}}
            rowItemStyle={{flexGrow: 1}}
            title="Schema Data Format Document"
          >
            <SdfDocumentEditor
              onChange={setSdfDocument}
              sdfDocument={sdfDocument}
            />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
