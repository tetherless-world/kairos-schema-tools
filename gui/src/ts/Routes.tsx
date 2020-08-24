import {Route, Router, Switch, Redirect} from "react-router-dom";
import * as React from "react";
import {NoRoute} from "components/error/NoRoute";
import {Hrefs} from "Hrefs";
import {SdfDocumentsPage} from "components/sdfDocument/SdfDocumentsPage";
import {SdfDocumentPage} from "components/sdfDocument/SdfDocumentPage";
import {SchemaPage} from "components/schema/SchemaPage";
import {SchemasPage} from "components/schema/SchemasPage";
import {SearchResultsPage} from "components/search/SearchResultsPage";
import {QueryParamProvider} from "use-query-params";
import {createBrowserHistory as createHistory} from "history";
import {ScrollManager, WindowScroller} from "react-scroll-manager";
import {PrimitivesPage} from "components/schema/PrimitivesPage";
import {SdfDocumentSchemasPage} from "components/sdfDocument/SdfDocumentSchemasPage";
import {SdfDocumentPrimitivesPage} from "../../../test/integration/cypress/support/pages/SdfDocumentPrimitivesPage";

const schemaIdParam = {id: ":schemaId", idEncoded: true};
const sdfDocumentIdParam = {id: ":sdfDocumentId", idEncoded: true};
const history = createHistory();

export const Routes: React.FunctionComponent = () => (
  <ScrollManager history={history}>
    <Router history={history}>
      <WindowScroller>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route exact path={Hrefs.home}>
              <Redirect to={Hrefs.sdfDocuments.toString()} />
            </Route>

            {/*All primitives*/}
            <Route
              exact
              path={Hrefs.primitives.toString()}
              component={PrimitivesPage}
            />

            {/*All schemas*/}
            <Route
              exact
              path={Hrefs.schemas.toString()}
              component={SchemasPage}
            />

            {/*All documents*/}
            <Route
              exact
              path={Hrefs.sdfDocuments.toString()}
              component={SdfDocumentsPage}
            />

            {/*One document*/}
            <Route
              exact
              path={Hrefs.sdfDocuments
                .sdfDocument(sdfDocumentIdParam)
                .toString()}
              component={SdfDocumentPage}
            />

            {/*Document primitives*/}
            <Route
              exact
              path={Hrefs.sdfDocuments
                .sdfDocument(sdfDocumentIdParam)
                .primitives.toString()}
              component={SdfDocumentPrimitivesPage}
            />

            {/*Document schemas*/}
            <Route
              exact
              path={Hrefs.sdfDocuments
                .sdfDocument(sdfDocumentIdParam)
                .schemas.toString()}
              component={SdfDocumentSchemasPage}
            />

            {/*Document schema*/}
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
      </WindowScroller>
    </Router>
  </ScrollManager>
);
