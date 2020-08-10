import {Link} from "components/link/Link";
import CodeIcon from "@material-ui/icons/Code";
import * as React from "react";
import {Button} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {SourcePath} from "components/link/SourcePath";

export const SourceLink: React.FunctionComponent<{
  to: SourcePath;
}> = ({to}) => {
  return (
    <Link
      to={Hrefs.sdfDocuments.sdfDocument({id: to.sdfDocumentId}).source(to)}
    >
      <Button variant="contained" startIcon={<CodeIcon />}>
        Source
      </Button>
    </Link>
  );
};
