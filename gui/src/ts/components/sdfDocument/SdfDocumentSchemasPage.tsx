import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SdfDocumentSchemasPageQueryDocument from "api/queries/SdfDocumentSchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SchemasTable} from "components/schema/SchemasTable";
import {NoRoute} from "components/error/NoRoute";
import {SdfDocumentLink} from "components/link/SdfDocumentLink";
import {SdfDocumentSchemasPageQuery} from "api/queries/types/SdfDocumentSchemasPageQuery";

export const SdfDocumentSchemasPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId: string}>();
  sdfDocumentId = decodeURIComponent(sdfDocumentId);

  const query = useQuery<SdfDocumentSchemasPageQuery>(
    SdfDocumentSchemasPageQueryDocument,
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
            title="Schemas"
          >
            <SchemasTable
              namespacePrefixes={sdfDocument.namespacePrefixes}
              schemas={sdfDocument.schemas}
            />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
