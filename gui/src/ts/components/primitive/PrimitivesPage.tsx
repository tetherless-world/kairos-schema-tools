import * as React from "react";
import {useQuery} from "@apollo/react-hooks";
import * as PrimitivesPageQueryDocument from "api/queries/PrimitivesPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {PrimitivesPageQuery} from "api/queries/types/PrimitivesPageQuery";
import {PrimitivesTable} from "components/primitive/PrimitivesTable";

export const PrimitivesPage: React.FunctionComponent = () => {
  const query = useQuery<PrimitivesPageQuery>(PrimitivesPageQueryDocument, {
    fetchPolicy: "no-cache",
  });

  return (
    <Frame {...query}>
      {({data}) => {
        return (
          <StandardLayout subtitle={"All documents"} title="Primitives">
            <PrimitivesTable primitives={data.primitives} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
