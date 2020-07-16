import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {invariant} from "ts-invariant";
import {Hrefs} from "Hrefs";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import {SchemaIcon} from "components/schema/SchemaIcon";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  schemaListItem: {
    border: "solid",
    borderWidth: 2,
    padding: theme.spacing(4),
  },
}));

export const SchemasPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId?: string}>();
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const classes = useStyles();

  const query = useQuery<SchemasPageQuery>(SchemasPageQueryDocument, {
    variables: {
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        let breadcrumbs: {sdfDocument: {id: string; name: string}} | undefined;
        type Schema = {id: string; name: string};
        let schemas: Schema[];
        let schemaHref: (schema: Schema) => string;
        let subtitle: React.ReactNode | undefined;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          invariant(sdfDocument, "must be defined if the id was");
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, name: sdfDocument!.name},
          };
          schemaHref = (schema: Schema) =>
            Hrefs.sdfDocuments
              .sdfDocument({id: sdfDocumentId!})
              .schemas.schema(schema)
              .toString();
          schemas = sdfDocument!.schemas;
          subtitle = (
            <span>
              Document:{" "}
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .toString()}
                data-cy="sdf-document-name"
              >
                {sdfDocument!.name}
              </Link>
            </span>
          );
        } else {
          schemaHref = (schema: Schema) =>
            Hrefs.schemas.schema(schema).toString();
          schemas = data.schemas ?? [];
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={subtitle}
            title="Schemas"
          >
            <List>
              {schemas.map((schema) => (
                <ListItem
                  className={classes.schemaListItem}
                  data-cy={"schema-" + schema.id}
                  key={schema.id}
                >
                  <ListItemIcon>
                    <SchemaIcon />
                  </ListItemIcon>
                  <Typography variant="h6">
                    <Link href={schemaHref(schema)}>{schema.name}</Link>
                  </Typography>
                </ListItem>
              ))}
            </List>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
