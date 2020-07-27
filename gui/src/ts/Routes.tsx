import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import * as React from "react";
import {NoRoute} from "components/error/NoRoute";
import {Hrefs} from "Hrefs";
import {SdfDocumentsPage} from "components/sdfDocument/SdfDocumentsPage";
import {SdfDocumentPage} from "components/sdfDocument/SdfDocumentPage";
import {SchemaPage} from "components/schema/SchemaPage";
import {SchemasPage} from "components/schema/SchemasPage";
import {SearchResultsPage} from "components/search/SearchResultsPage";
import {QueryParamProvider} from "use-query-params";

const schemaIdParam = {id: ":schemaId", idEncoded: true};
const sdfDocumentIdParam = {id: ":sdfDocumentId", idEncoded: true};

export const Routes: React.FunctionComponent = () => (
  <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Switch>
        <Route exact path={Hrefs.home}>
          <Redirect to={Hrefs.sdfDocuments.toString()} />
        </Route>

        <Route exact path={Hrefs.schemas.toString()} component={SchemasPage} />

        {/*Get to a schema page via the schemas page*/}
        <Route
          exact
          path={Hrefs.schemas.schema(schemaIdParam).toString()}
          component={SchemaPage}
        />

        <Route
          exact
          path={Hrefs.sdfDocuments.toString()}
          component={SdfDocumentsPage}
        />

        <Route
          exact
          path={Hrefs.sdfDocuments.sdfDocument(sdfDocumentIdParam).toString()}
          component={SdfDocumentPage}
        />

        {/*Get to schemas via a document*/}
        <Route
          exact
          path={Hrefs.sdfDocuments
            .sdfDocument(sdfDocumentIdParam)
            .schemas.toString()}
          component={SchemasPage}
        />

        {/*Get to a schema via a document*/}
        <Route
          exact
          path={Hrefs.sdfDocuments
            .sdfDocument(sdfDocumentIdParam)
            .schemas.schema(schemaIdParam)
            .toString()}
          component={SchemaPage}
        />

        <Route exact path={Hrefs.search()} component={SearchResultsPage} />

        <Route component={NoRoute} />
      </Switch>
    </QueryParamProvider>
  </BrowserRouter>
);
