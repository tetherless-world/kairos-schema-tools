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
import {Grid, Tab, Tabs} from "@material-ui/core";
import {SdfDocumentEditor} from "components/sdfDocument/SdfDocumentEditor";
import {useQueryParam} from "use-query-params";

export const SdfDocumentPage: React.FunctionComponent = () => {
  const {sdfDocumentId} = _.mapValues(
    useParams<{sdfDocumentId: string}>(),
    decodeURIComponent
  );
  let [tab, setTab] = useQueryParam<string>("tab");
  if (!tab) {
    tab = "table";
  }
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
          schemas: data.sdfDocumentById.schemas.map((schema) =>
            Object.assign({}, schema, {sdfDocumentId})
          ),
        });

        return (
          <StandardLayout
            breadcrumbs={{sdfDocument}}
            rowItemStyle={{flexGrow: 1}}
            title="Schema Data Format Document"
          >
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Tabs onChange={(_, newValue) => setTab(newValue)} value={tab}>
                  <Tab label="Table" value="table" />
                  <Tab label="Source" value="source" />
                </Tabs>
              </Grid>
              <Grid item>
                <div hidden={tab !== "table"}>
                  <SdfDocumentCard {...sdfDocument} />
                </div>
                <div hidden={tab !== "source"}>
                  <SdfDocumentEditor sourceJson={sdfDocument.sourceJson} />
                </div>
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
