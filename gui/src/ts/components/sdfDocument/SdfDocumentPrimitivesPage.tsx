import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SdfDocumentPrimitivesPageQueryDocument from "api/queries/SdfDocumentPrimitivesPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentLink} from "components/link/SdfDocumentLink";
import {PrimitivesTable} from "components/primitive/PrimitivesTable";
import {SdfDocumentPrimitivesPageQuery} from "api/queries/types/SdfDocumentPrimitivesPageQuery";

export const SdfDocumentPrimitivesPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId: string}>();
  sdfDocumentId = decodeURIComponent(sdfDocumentId);

  const query = useQuery<SdfDocumentPrimitivesPageQuery>(
    SdfDocumentPrimitivesPageQueryDocument,
    {
      fetchPolicy: "no-cache",
      variables: {
        sdfDocumentId,
      },
    }
  );

  return (
    <Frame {...query}>
      {({data}) => {
        const sdfDocument = data.sdfDocumentById;
        if (!sdfDocument) {
          return <NoRoute />;
        }

        return (
          <StandardLayout
            breadcrumbs={{
              sdfDocument: {id: sdfDocumentId, label: sdfDocument.label},
            }}
            subtitle={
              <span>
                Document:{" "}
                <SdfDocumentLink
                  sdfDocument={{id: sdfDocumentId, label: sdfDocument.label}}
                />
              </span>
            }
            title="Primitives"
          >
            <PrimitivesTable primitives={sdfDocument.primitives} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
