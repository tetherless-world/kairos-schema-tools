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
import {RefvarTable} from "components/schema/RefvarTable";
import {OrdersGraph} from "components/schema/OrdersGraph";
import {shortenUri} from "models/shortenUri";
import {AchievesRequiresTable} from "components/schema/AchievesRequiresTable";

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
      sdfDocumentId,
    },
  });

  type TabValue = "table" | "refvar" | "order" | "achieves-requires";
  const tabDefinitions: readonly {label: string; value: TabValue}[] = [
    {label: "Table", value: "table"},
    {label: "Refvar", value: "refvar"},
    {label: "Order", value: "order"},
    {label: "Achieves/Requires", value: "achieves-requires"},
  ];
  let [tab, setTab] = useQueryParam<TabValue>("tab");
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
        const namespacePrefixes = schema.path.sdfDocument.namespacePrefixes;

        return (
          <StandardLayout
            breadcrumbs={{
              sdfDocument: {
                id: sdfDocumentId,
                label: sdfDocument.label,
                schema,
              },
            }}
            rowItemStyle={{flexGrow: 1}}
            subtitle={shortenUri({namespacePrefixes, uri: schema.id})}
            title={
              <span>
                Schema: <strong data-cy="schema-name">{schema.label}</strong>
              </span>
            }
          >
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Tabs onChange={(_, newValue) => setTab(newValue)} value={tab}>
                  {tabDefinitions.map((tabDefinition) => (
                    <Tab
                      data-cy={`${tabDefinition.value}-tab`}
                      key={tabDefinition.value}
                      label={tabDefinition.label}
                      value={tabDefinition.value}
                    />
                  ))}
                </Tabs>
              </Grid>
              <Grid item>
                <div hidden={tab !== "table"}>
                  <Grid container direction="column">
                    <Grid item>
                      <SchemaTableOfContents hrefs={hrefs} schema={schema} />
                    </Grid>
                    <Grid item>
                      <SchemaSectionContentsGrid
                        hrefs={hrefs}
                        namespacePrefixes={namespacePrefixes}
                        schema={schema}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div hidden={tab !== "refvar"}>
                  <RefvarTable hrefs={hrefs} schema={schema} />
                </div>
                <div
                  hidden={tab !== "order"}
                  style={{minHeight: 600, minWidth: 800}}
                >
                  <OrdersGraph hrefs={hrefs} schema={schema} />
                </div>
                <div
                  hidden={tab !== "achieves-requires"}
                  style={{minHeight: 600, minWidth: 800}}
                >
                  <AchievesRequiresTable hrefs={hrefs} schema={schema} />
                </div>
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
