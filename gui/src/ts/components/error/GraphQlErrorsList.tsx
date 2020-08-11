import {GraphQLError} from "graphql";
import {List, ListItem, ListItemText} from "@material-ui/core";
import * as React from "react";

export const GraphQlErrorsList: React.FunctionComponent<{
  errors: readonly GraphQLError[];
}> = ({errors}) => (
  <List>
    {errors.map((error, errorIndex) => (
      <ListItem key={errorIndex}>
        <ListItemText>GraphQL error: {error.message}</ListItemText>
      </ListItem>
    ))}
  </List>
);
