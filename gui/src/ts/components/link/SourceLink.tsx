import {Link} from "components/link/Link";
import CodeIcon from "@material-ui/icons/Code";
import * as React from "react";
import {Button} from "@material-ui/core";
import {SchemaPathFragment} from "api/queries/types/SchemaPathFragment";

export const SourceLink: React.FunctionComponent<{to: SchemaPathFragment}> = ({
  to,
}) => {
  return (
    <Link to={}>
      <Button variant="contained" startIcon={<CodeIcon />}>
        Source
      </Button>
    </Link>
  );
};
