import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";

export const ProvenanceLink: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenance: string;
}> = ({hrefs, provenance}) => {
  if (provenance === "n/a") {
    return <span>{provenance}</span>;
  }
  return (
    <Link
      to={hrefs.provenanceDataObject({
        id: provenance,
      })}
    >
      {provenance}
    </Link>
  );
};
