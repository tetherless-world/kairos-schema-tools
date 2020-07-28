import {useQueryParam} from "use-query-params";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import * as SearchResultsPageQueryDocument from "api/queries/SearchResultsPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import * as React from "react";
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import {Typography} from "@material-ui/core";
import {
  SearchResultsPageQuery,
  SearchResultsPageQuery_search,
  SearchResultsPageQuery_search_documents,
  SearchResultsPageQueryVariables,
} from "api/queries/types/SearchResultsPageQuery";
import * as ReactDOM from "react-dom";
import {Hrefs} from "Hrefs";
import {SearchDocumentType} from "api/graphqlGlobalTypes";
import {invariant} from "ts-invariant";
import {Link} from "components/Link";

const columns: MUIDataTableColumn[] = [
  {
    name: "#",
    options: {
      customBodyRender(_, tableMeta) {
        const rowNumberOneBased =
          tableMeta.tableState.page * tableMeta.tableState.rowsPerPage +
          tableMeta.rowIndex +
          1;
        return <span data-cy="row-number">{rowNumberOneBased}</span>;
      },
    },
  },
  {
    name: "id",
    options: {
      display: "false",
    },
  },
  {
    name: "type",
    label: "Type",
    options: {
      customBodyRender(value): any {
        return <span data-cy="type">{value}</span>;
      },
    },
  },
  {
    name: "sdfDocument",
    options: {
      display: "false",
    },
  },
  {
    name: "sdfDocumentId",
    label: "SDF document",
    options: {
      customBodyRender(_, tableMeta): any {
        // @ts-ignore
        const rowData = (tableMeta.tableData[
          tableMeta.rowIndex
        ] as unknown) as any[];
        const sdfDocumentId: string =
          rowData[getPropertyColumnIndex("sdfDocumentId")];
        const sdfDocument = rowData[getPropertyColumnIndex("sdfDocument")];
        return (
          <Link
            to={Hrefs.sdfDocuments.sdfDocument({id: sdfDocumentId}).toString()}
            data-cy="sdf-document-link"
          >
            {sdfDocument ? sdfDocument.name : sdfDocumentId}
          </Link>
        );
      },
    },
  },
  {
    name: "schema",
    options: {
      display: "false",
    },
  },
  {
    name: "schemaId",
    label: "Schema",
    options: {
      customBodyRender(_, tableMeta): any {
        // @ts-ignore
        const rowData = (tableMeta.tableData[
          tableMeta.rowIndex
        ] as unknown) as any[];
        const schema = rowData[getPropertyColumnIndex("schema")];
        const schemaId = rowData[getPropertyColumnIndex("schemaId")];
        const sdfDocumentId: string =
          rowData[getPropertyColumnIndex("sdfDocumentId")];
        return (
          <Link
            to={Hrefs.sdfDocuments
              .sdfDocument({id: sdfDocumentId})
              .schemas.schema({id: schemaId})
              .toString()}
            data-cy="schema-link"
          >
            {schema ? schema.name : schemaId}
          </Link>
        );
      },
    },
  },
  {
    name: "label",
    label: "Link",
    options: {
      customBodyRender(label, tableMeta) {
        const rowData = (tableMeta.tableData[
          tableMeta.rowIndex
        ] as unknown) as any[];
        const schemaId: string = rowData[getPropertyColumnIndex("schemaId")];
        const sdfDocumentId: string =
          rowData[getPropertyColumnIndex("sdfDocumentId")];
        const slotId: string = rowData[getPropertyColumnIndex("slotId")];
        const stepId: string = rowData[getPropertyColumnIndex("stepId")];
        const type: SearchDocumentType =
          rowData[getPropertyColumnIndex("type")];

        const dataCy = "label-link";
        switch (type) {
          case SearchDocumentType.Schema:
            invariant(schemaId, "schema id must be defined");
            return (
              <Link
                dataCy={dataCy}
                to={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId!})
                  .toString()}
              >
                Schema: {label}
              </Link>
            );
          case SearchDocumentType.SdfDocument:
            return (
              <Link
                dataCy={dataCy}
                to={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .toString()}
              >
                SDF document: {label}
              </Link>
            );
          case SearchDocumentType.Slot:
            invariant(schemaId, "schema id must be defined");
            invariant(slotId, "slot id must be defined");
            return (
              <Link
                dataCy={dataCy}
                to={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId})
                  .slot({id: slotId})
                  .toString()}
              >
                Slot: {label}
              </Link>
            );
          case SearchDocumentType.Step:
            invariant(schemaId, "schema id must be defined");
            invariant(stepId, "step id must be defined");
            return (
              <Link
                dataCy={dataCy}
                to={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId})
                  .step({id: stepId})
                  .toString()}
              >
                Step: {label}
              </Link>
            );
          default:
            return <span data-cy={dataCy}>{label}</span>;
        }
      },
    },
  },
  {
    name: "slotId",
    options: {
      display: "false",
    },
  },
  {
    name: "stepId",
    options: {
      display: "false",
    },
  },
];

const getPropertyColumnIndex = (
  property: Exclude<keyof SearchResultsPageQuery_search_documents, "__typename">
) => {
  return columns.findIndex(
    (col) => typeof col !== "string" && col.name === property
  );
};

export const SearchResultsPage: React.FunctionComponent = () => {
  const apolloClient = useApolloClient();

  const [queryText, setQueryText] = useQueryParam<string>("query");
  const [
    searchResults,
    setSearchResults,
  ] = React.useState<SearchResultsPageQuery_search | null>(null);

  const limit = 20;

  const query = useQuery<
    SearchResultsPageQuery,
    SearchResultsPageQueryVariables
  >(SearchResultsPageQueryDocument, {
    variables: {limit, offset: 0, query: queryText},
  });

  const onChange = (variables: SearchResultsPageQueryVariables) => {
    apolloClient
      .query<SearchResultsPageQuery, SearchResultsPageQueryVariables>({
        query: SearchResultsPageQueryDocument,
        variables,
      })
      .then(({data, errors, loading}) => {
        if (errors) {
        } else if (loading) {
        } else if (!data) {
          throw new EvalError();
        }
        ReactDOM.unstable_batchedUpdates(() => {
          setQueryText(variables.query);
          setSearchResults(data.search);
        });
      });
  };

  return (
    <Frame {...query} onSearch={(query) => onChange({limit, offset: 0, query})}>
      {({data: initialData}) => {
        if (searchResults === null) {
          setSearchResults(initialData.search);
          return;
        }
        return (
          <div data-cy="search-results">
            <MUIDataTable
              title={
                <Typography variant="h6" data-cy="title">
                  Search results for <i>{queryText}</i>
                </Typography>
              }
              data={searchResults.documents}
              columns={columns}
              options={{
                count: searchResults.total,
                filter: false,
                rowsPerPageOptions: [],
                serverSide: true,
                sort: false,
                onChangePage: (newPage: number) =>
                  onChange({limit, offset: limit * newPage, query: queryText}),
                onChangeRowsPerPage: (newRowsPerPage: number) => {},
                selectableRows: "none",
                setRowProps(row: any[], rowIndex) {
                  return {
                    "data-cy": "row-" + row[getPropertyColumnIndex("id")],
                  };
                },
              }}
            />
          </div>
        );
      }}
    </Frame>
  );
};
