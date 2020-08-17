import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SchemaPageQueryDocument from "api/queries/SchemaPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {SchemaPageQuery} from "api/queries/types/SchemaPageQuery";
import {StandardLayout} from "components/layout/StandardLayout";
import {NoRoute} from "components/error/NoRoute";
import {Hrefs} from "Hrefs";
import * as _ from "lodash";
import {SchemaSectionContentsGrid} from "components/schema/SchemaSectionContentsGrid";
import {useQueryParam} from "use-query-params";
import {Grid, Tab, Tabs} from "@material-ui/core";
import {SchemaTableOfContents} from "components/schema/SchemaTableOfContents";

export const SchemaPage: React.FunctionComponent = () => {
  const {schemaId, sdfDocumentId} = _.mapValues(
    useParams<{
      schemaId: string;
      sdfDocumentId: string;
    }>(),
    decodeURIComponent
  );

  const query = useQuery<SchemaPageQuery>(SchemaPageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {
      schemaId,
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  let [tab, setTab] = useQueryParam<string>("tab");
  if (!tab) {
    tab = "table";
  }

  const hrefs = Hrefs.sdfDocuments
    .sdfDocument({id: sdfDocumentId})
    .schemas.schema({id: schemaId});

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.schemaById) {
          return <NoRoute />;
        }

        const schema = Object.assign({}, data.schemaById, {id: schemaId});
        const sdfDocument = data.sdfDocumentById;
        if (!sdfDocument) {
          return <NoRoute />;
        }

        return (
          <StandardLayout
            breadcrumbs={{
              schema,
              sdfDocument: {id: sdfDocumentId, label: sdfDocument!.label},
            }}
            rowItemStyle={{flexGrow: 1}}
            subtitle={schema.id}
            title={
              <span>
                Schema: <strong data-cy="schema-name">{schema.label}</strong>
              </span>
            }
          >
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Tabs onChange={(_, newValue) => setTab(newValue)} value={tab}>
                  <Tab data-cy="table-tab" label="Table" value="table" />
                  {/*<Tab data-cy="graph-tab" label="Graph" value="graph" />*/}
                </Tabs>
              </Grid>
              <Grid item>
                <div hidden={tab !== "table"}>
                  <Grid container direction="column">
                    <Grid item>
                      <SchemaTableOfContents hrefs={hrefs} schema={schema} />
                      <Grid item>
                        <SchemaSectionContentsGrid
                          hrefs={hrefs}
                          schema={schema}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                {/*<div*/}
                {/*  hidden={tab !== "graph"}*/}
                {/*  style={{minHeight: 600, minWidth: 800}}*/}
                {/*>*/}
                {/*  <SchemaGraph hrefs={hrefs} schema={schema} />*/}
                {/*</div>*/}
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
