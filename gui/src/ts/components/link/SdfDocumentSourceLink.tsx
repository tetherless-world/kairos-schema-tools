import {Link} from "components/link/Link";
import CodeIcon from "@material-ui/icons/Code";
import * as React from "react";
import {Button} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {DefinitionPath} from "models/definition/DefinitionPath";

export const SdfDocumentSourceLink: React.FunctionComponent<{
  to: DefinitionPath;
}> = ({to}) => {
  return (
    <Link to={Hrefs.sdfDocuments.sdfDocument({id: to.id}).sourcePath(to)}>
      <Button variant="contained" startIcon={<CodeIcon />}>
        Source
      </Button>
    </Link>
  );
};
