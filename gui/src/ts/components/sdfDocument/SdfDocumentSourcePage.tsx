import * as React from "react";
import * as SdfDocumentSourcePageQueryDocument from "api/queries/SdfDocumentSourcePageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentSourcePageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentEditor} from "components/sdfDocument/SdfDocumentEditor";

export const SdfDocumentSourcePage: React.FunctionComponent = () => {
  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );
  const query = useQuery<SdfDocumentSourcePageQuery>(
    SdfDocumentSourcePageQueryDocument,
    {
      fetchPolicy: "network-only",
      variables: {id: sdfDocumentId},
    }
  );
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
