import * as React from "react";
import * as SdfDocumentsPageQueryDocument from "api/queries/SdfDocumentsPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import {SdfDocumentsPageQuery} from "api/queries/types/SdfDocumentsPageQuery";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";

export const SdfDocumentsPage: React.FunctionComponent = () => {
  const query = useQuery<SdfDocumentsPageQuery>(SdfDocumentsPageQueryDocument);

  return (
    <Frame {...query}>
      {({data}) => (
        <Grid container justify="center">
          <Grid item>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4" style={{textAlign: "center"}}>
                  Schema Data Format Documents
                </Typography>
              </Grid>
              <Grid item container>
                {data.sdfDocuments.map((sdfDocument) => (
                  <Grid item key={sdfDocument.id}>
                    <SdfDocumentCard {...sdfDocument} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Frame>
  );
};
