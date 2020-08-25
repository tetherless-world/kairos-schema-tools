import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as PrimitivePageQueryDocument from "api/queries/PrimitivePageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {PrimitivePageQuery} from "api/queries/types/PrimitivePageQuery";
import {StandardLayout} from "components/layout/StandardLayout";
import {NoRoute} from "components/error/NoRoute";
import {Hrefs} from "Hrefs";
import * as _ from "lodash";
import {PrimitiveSectionContentsGrid} from "components/primitive/PrimitiveSectionContentsGrid";
import {Grid} from "@material-ui/core";
import {PrimitiveTableOfContents} from "components/primitive/PrimitiveTableOfContents";

export const PrimitivePage: React.FunctionComponent = () => {
  const {primitiveId, sdfDocumentId} = _.mapValues(
    useParams<{
      primitiveId: string;
      sdfDocumentId: string;
    }>(),
    decodeURIComponent
  );

  const query = useQuery<PrimitivePageQuery>(PrimitivePageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {
      primitiveId,
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  const hrefs = Hrefs.sdfDocuments
    .sdfDocument({id: sdfDocumentId})
    .primitives.primitive({id: primitiveId});

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.primitiveById) {
          return <NoRoute />;
        }

        const primitive = Object.assign({}, data.primitiveById, {
          id: primitiveId,
        });
        const sdfDocument = data.sdfDocumentById;
        if (!sdfDocument) {
          return <NoRoute />;
        }

        return (
          <StandardLayout
            breadcrumbs={{
              sdfDocument: {
                id: sdfDocumentId,
                label: sdfDocument!.label,
                primitive,
              },
            }}
            rowItemStyle={{flexGrow: 1}}
            subtitle={primitive.id}
            title={
              <span>
                Primitive:{" "}
                <strong data-cy="primitive-name">{primitive.label}</strong>
              </span>
            }
          >
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <PrimitiveTableOfContents
                      hrefs={hrefs}
                      primitive={primitive}
                    />
                    <Grid item>
                      <PrimitiveSectionContentsGrid
                        hrefs={hrefs}
                        primitive={primitive}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
