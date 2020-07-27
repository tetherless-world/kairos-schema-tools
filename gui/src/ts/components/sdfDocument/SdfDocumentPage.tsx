import * as React from "react";
import * as SdfDocumentPageQueryDocument from "api/queries/SdfDocumentPageQuery.graphql";
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {Frame} from "components/frame/Frame";
import {SdfDocumentCard} from "components/sdfDocument/SdfDocumentCard";
import {StandardLayout} from "components/layout/StandardLayout";
import {SdfDocumentPageQuery} from "api/queries/types/SdfDocumentPageQuery";
import * as _ from "lodash";
import {NoRoute} from "components/error/NoRoute";
import {Grid} from "@material-ui/core";
import {SdfDocumentEditor} from "components/sdfDocument/SdfDocumentEditor";

export const SdfDocumentPage: React.FunctionComponent = () => {
  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );
  const query = useQuery<SdfDocumentPageQuery>(SdfDocumentPageQueryDocument, {
    variables: {id: sdfDocumentId},
  });

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.sdfDocumentById) {
          return <NoRoute />;
        }

        const sdfDocument = Object.assign({}, data.sdfDocumentById, {
          id: sdfDocumentId,
        });

        return (
          <StandardLayout
            breadcrumbs={{sdfDocument}}
            rowItemStyle={{flexGrow: 1}}
            title="Schema Data Format Document"
          >
            <Grid container direction="column" spacing={4}>
              <Grid item data-cy="sdf-document-card">
                <SdfDocumentCard {...sdfDocument} />
              </Grid>
              <Grid item>
                <SdfDocumentEditor sourceJson={sdfDocument.sourceJson} />
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
