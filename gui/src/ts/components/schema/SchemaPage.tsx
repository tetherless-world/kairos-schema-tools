import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SchemaPageQueryDocument from "api/queries/SchemaPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {SchemaPageQuery} from "api/queries/types/SchemaPageQuery";
import {invariant} from "ts-invariant";
import {StandardLayoutBreadcrumbs} from "components/layout/StandardLayoutBreadcrumbs";
import {StandardLayout} from "components/layout/StandardLayout";

export const SchemaPage: React.FunctionComponent = () => {
  let {schemaId, sdfDocumentId} = useParams<{
    schemaId: string;
    sdfDocumentId?: string;
  }>();
  schemaId = decodeURIComponent(schemaId);
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemaPageQuery>(SchemaPageQueryDocument, {
    variables: {
      schemaId,
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        let breadcrumbs: StandardLayoutBreadcrumbs;
        const schema = Object.assign({}, data.schemaById!, {id: schemaId});
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          invariant(sdfDocument, "must be defined if the id was");
          breadcrumbs = {
            schema,
            sdfDocument: {id: sdfDocumentId, name: sdfDocument!.name},
          };
        } else {
          breadcrumbs = {schema};
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={schema.id}
            title={
              <span>
                Schema: <strong data-cy="schema-name">{schema.name}</strong>
              </span>
            }
          >
            <div></div>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
