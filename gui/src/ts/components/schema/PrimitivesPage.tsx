import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as PrimitivesPageQueryDocument from "api/queries/PrimitivesPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {NoRoute} from "components/error/NoRoute";
import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {DefinitionPath} from "models/definition/DefinitionPath";
import {SdfDocumentLink} from "components/link/SdfDocumentLink";
import {PrimitivesPageQuery} from "api/queries/types/PrimitivesPageQuery";
import {PrimitivesTable} from "components/schema/PrimitivesTable";

export const PrimitivesPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId?: string}>();
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<PrimitivesPageQuery>(PrimitivesPageQueryDocument, {
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
        type Primitive = {id: string; label: string; path: DefinitionPath};
        let primitives: Primitive[];
        let subtitle: React.ReactNode;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, label: sdfDocument.label},
          };
          primitives = sdfDocument!.primitives;
          subtitle = (
            <span>
              Document:{" "}
              <SdfDocumentLink
                sdfDocument={{id: sdfDocumentId, label: sdfDocument.label}}
              />
            </span>
          );
        } else {
          primitives = data.primitives ?? [];
          subtitle = "All documents";
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={subtitle}
            title="Primitives"
          >
            <PrimitivesTable primitives={primitives} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
