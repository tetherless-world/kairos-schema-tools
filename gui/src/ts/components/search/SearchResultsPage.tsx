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
  SearchResultsPageQueryVariables,
} from "api/queries/types/SearchResultsPageQuery";
import * as ReactDOM from "react-dom";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {DefinitionPath} from "models/definition/DefinitionPath";

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
  // id needed to add the data-cy attribute
  {
    name: "id",
    options: {
      display: "false",
    },
  },
  {
    name: "path",
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
    name: "label",
    label: "Link",
    options: {
      customBodyRender(label, tableMeta) {
        const rowData = (tableMeta.tableData[
          tableMeta.rowIndex
        ] as unknown) as any[];
        const path: DefinitionPath = rowData[getPropertyColumnIndex("path")];

        return (
          <Link dataCy={"label-link"} to={Hrefs.definitionPath(path)}>
            {label}
          </Link>
        );
      },
    },
  },
];

const getPropertyColumnIndex = (property: string) => {
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
    fetchPolicy: "no-cache",
    variables: {limit, offset: 0, query: queryText},
  });

  const onChange = (variables: SearchResultsPageQueryVariables) => {
    apolloClient
      .query<SearchResultsPageQuery, SearchResultsPageQueryVariables>({
        fetchPolicy: "no-cache",
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
                // enableNestedDataAccess: ".", // allows nested data separated by "." (see column names and the data structure above)
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
