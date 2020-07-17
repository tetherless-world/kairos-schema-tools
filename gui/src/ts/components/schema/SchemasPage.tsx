import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {Hrefs} from "Hrefs";
import {Link} from "@material-ui/core";
import {SchemasTable} from "components/schema/SchemasTable";
import {StandardLayoutBreadcrumbs} from "components/layout/StandardLayoutBreadcrumbs";
import {NoRoute} from "components/error/NoRoute";

export const SchemasPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId?: string}>();
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemasPageQuery>(SchemasPageQueryDocument, {
    variables: {
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        let breadcrumbs: StandardLayoutBreadcrumbs | undefined;
        type Schema = {id: string; name: string};
        let schemas: Schema[];
        let subtitle: React.ReactNode | undefined;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, name: sdfDocument.name},
          };
          schemas = sdfDocument!.schemas;
          subtitle = (
            <span>
              Document:{" "}
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .toString()}
                data-cy="sdf-document-name"
              >
                {sdfDocument.name}
              </Link>
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
            <SchemasTable schemas={schemas} sdfDocumentId={sdfDocumentId} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
