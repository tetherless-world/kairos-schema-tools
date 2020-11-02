import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {SchemaPageQuery_schemaById_provenanceData} from "api/queries/types/SchemaPageQuery";

export const ProvenanceLink: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  provenance: string;
  provenanceData: readonly SchemaPageQuery_schemaById_provenanceData[] | null;
}> = ({hrefs, provenance, provenanceData}) => {
  if (
    provenance === "n/a" ||
    !provenanceData ||
    !provenanceData.some(
      (provenanceDataObject) => provenanceDataObject.id === provenance
    )
  ) {
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
