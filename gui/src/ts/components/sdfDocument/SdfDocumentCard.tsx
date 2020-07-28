import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {SchemasTable} from "components/schema/SchemasTable";
import {Link} from "components/Link";

export const SdfDocumentCard: React.FunctionComponent<{
  id: string;
  name: string;
  schemas: {
    id: string;
    name: string;
    sdfDocumentId: string;
  }[];
}> = ({id, name, schemas}) => {
  return (
    <Card data-cy={"sdf-document-card-" + id}>
      <CardHeader
        title={
          <React.Fragment>
            <Link
              dataCy="sdf-document-name"
              to={Hrefs.sdfDocuments.sdfDocument({id}).toString()}
            >
              {name}
            </Link>
          </React.Fragment>
        }
      />
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h6">
              Identifier: <span data-cy="sdf-document-id">{id}</span>
            </Typography>
          </Grid>
          <Grid item data-cy="sdf-document-schemas">
            <Typography variant="h5">
              <Link
                dataCy="sdf-document-schemas-header"
                to={Hrefs.sdfDocuments.sdfDocument({id}).schemas.toString()}
              >
                Schemas
              </Link>
            </Typography>
            <SchemasTable schemas={schemas} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  return <div></div>;
};
