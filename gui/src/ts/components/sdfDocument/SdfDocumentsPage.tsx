import * as React from "react";
import * as SdfDocumentsPageQueryDocument from "api/queries/SdfDocumentsPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {Grid} from "@material-ui/core";
import {SdfDocumentsPageQuery} from "api/queries/types/SdfDocumentsPageQuery";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";
import {StandardLayout} from "components/layout/StandardLayout";

export const SdfDocumentsPage: React.FunctionComponent = () => {
  const query = useQuery<SdfDocumentsPageQuery>(SdfDocumentsPageQueryDocument, {
    fetchPolicy: "no-cache",
  });

  return (
    <Frame {...query}>
      {({data}) => (
        <StandardLayout title="Schema Data Format Documents">
          <Grid container spacing={4}>
            {data.sdfDocuments.map((sdfDocument) => (
              <Grid item key={sdfDocument.id}>
                <SdfDocumentCard sdfDocument={sdfDocument} />
              </Grid>
            ))}
          </Grid>
        </StandardLayout>
      )}
    </Frame>
  );
};
