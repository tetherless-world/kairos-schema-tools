import * as React from "react";
import * as SdfDocumentsPageQueryDocument from "api/queries/SdfDocumentsPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import {SdfDocumentsPageQuery} from "api/queries/types/SdfDocumentsPageQuery";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";

export const SdfDocumentsPage: React.FunctionComponent = () => {
  const query = useQuery<SdfDocumentsPageQuery>(SdfDocumentsPageQueryDocument);

  return (
    <Frame {...query}>
      {({data}) => (
        <Grid container>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="Schema Data Format Documents" />
              <CardContent>
                <Grid container>
                  {data.sdfDocuments.map((sdfDocument) => (
                    <Grid item key={sdfDocument.id}>
                      <SdfDocumentCard {...sdfDocument} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Frame>
  );
};
