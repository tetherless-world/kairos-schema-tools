import * as React from "react";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {SchemasTable} from "components/schema/SchemasTable";

export const SchemasPage: React.FunctionComponent = () => {
  const query = useQuery<SchemasPageQuery>(SchemasPageQueryDocument, {
    fetchPolicy: "no-cache",
  });

  return (
    <Frame {...query}>
      {({data}) => {
        return (
          <StandardLayout subtitle="All documents" title="Schemas">
            <SchemasTable schemas={data.schemas} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
