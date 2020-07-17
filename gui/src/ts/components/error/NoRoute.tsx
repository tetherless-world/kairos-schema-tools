import * as React from "react";

import {useLocation} from "react-router-dom";
import {Card, CardContent, CardHeader} from "@material-ui/core";

export const NoRoute: React.FunctionComponent = () => {
  const location = useLocation();
  return (
    <Card>
      <CardHeader title="Not Found" />
      <CardContent>
        <code>{location.pathname}</code>
      </CardContent>
    </Card>
  );
};
