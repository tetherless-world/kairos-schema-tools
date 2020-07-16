import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {invariant} from "ts-invariant";
import {Hrefs} from "Hrefs";
import {Link} from "@material-ui/core";
import {SchemasTable} from "components/schema/SchemasTable";

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
        let breadcrumbs: {sdfDocument: {id: string; name: string}} | undefined;
        type Schema = {id: string; name: string};
        let schemas: Schema[];
        let subtitle: React.ReactNode | undefined;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          invariant(sdfDocument, "must be defined if the id was");
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, name: sdfDocument!.name},
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
                {sdfDocument!.name}
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
