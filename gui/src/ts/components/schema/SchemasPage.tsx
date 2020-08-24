import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SchemasTable} from "components/schema/SchemasTable";
import {NoRoute} from "components/error/NoRoute";
import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {SdfDocumentLink} from "components/link/SdfDocumentLink";

export const SchemasPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId?: string}>();
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemasPageQuery>(SchemasPageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        let breadcrumbs: BreadcrumbsProps | undefined;
        type Schema = {id: string; label: string; path: DefinitionPath};
        let schemas: Schema[];
        let subtitle: React.ReactNode;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, label: sdfDocument.label},
          };
          schemas = sdfDocument!.schemas;
          subtitle = (
            <span>
              Document:{" "}
              <SdfDocumentLink
                sdfDocument={{id: sdfDocumentId, label: sdfDocument.label}}
              />
            </span>
          );
        } else {
          schemas = data.schemas ?? [];
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={subtitle}
            title="Schemas"
          >
            <SchemasTable schemas={schemas} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
