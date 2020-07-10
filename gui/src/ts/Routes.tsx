import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import * as React from "react";
import {NoRoute} from "components/error/NoRoute";
import {Hrefs} from "Hrefs";
import {SdfDocumentsPage} from "components/sdfDocument/SdfDocumentsPage";

// const schemaIdParam = {id: ":schemaId", idEncoded: true};
// const sdfDocumentIdParam = {id: ":sdfDocumentId", idEncoded: true};

export const Routes: React.FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={Hrefs.home}>
        <Redirect to={Hrefs.sdfDocuments.toString()} />
      </Route>

      <Route
        exact
        path={Hrefs.sdfDocuments.toString()}
        component={SdfDocumentsPage}
      />

      <Route component={NoRoute} />
    </Switch>
  </BrowserRouter>
);
