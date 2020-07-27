import {useQueryParam} from "use-query-params";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import * as SearchResultsPageQueryDocument from "api/queries/SearchResultsPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import * as React from "react";
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import {Link, Typography} from "@material-ui/core";
import {
  SearchResultsPageQuery,
  SearchResultsPageQuery_search,
  SearchResultsPageQuery_search_documents,
  SearchResultsPageQuery_search_documents_schema,
  SearchResultsPageQuery_search_documents_sdfDocument,
  SearchResultsPageQuery_search_documents_slot,
  SearchResultsPageQuery_search_documents_step,
  SearchResultsPageQueryVariables,
} from "api/queries/types/SearchResultsPageQuery";
import * as ReactDOM from "react-dom";
import {Hrefs} from "Hrefs";
import {SearchDocumentType} from "api/graphqlGlobalTypes";
import {invariant} from "ts-invariant";

const columns: MUIDataTableColumn[] = [
  {
    name: "#",
    options: {
      customBodyRender(_, tableMeta) {
        return (
          tableMeta.tableState.page * tableMeta.tableState.rowsPerPage +
          tableMeta.rowIndex +
          1
        );
      },
    },
  },
  {
    name: "type",
    label: "Type",
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
            href={Hrefs.sdfDocuments
              .sdfDocument({id: sdfDocumentId})
              .toString()}
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
            href={Hrefs.sdfDocuments
              .sdfDocument({id: sdfDocumentId})
              .schemas.schema({id: schemaId})
              .toString()}
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
        const schema:
          | SearchResultsPageQuery_search_documents_schema
          | undefined = rowData[getPropertyColumnIndex("schema")];
        const schemaId: string = rowData[getPropertyColumnIndex("schemaId")];
        const sdfDocument:
          | SearchResultsPageQuery_search_documents_sdfDocument
          | undefined = rowData[getPropertyColumnIndex("sdfDocument")];
        const sdfDocumentId: string =
          rowData[getPropertyColumnIndex("sdfDocumentId")];
        const slot: SearchResultsPageQuery_search_documents_slot | undefined =
          rowData[getPropertyColumnIndex("slot")];
        const slotId: string = rowData[getPropertyColumnIndex("slotId")];
        const step: SearchResultsPageQuery_search_documents_step | undefined =
          rowData[getPropertyColumnIndex("step")];
        const stepId: string = rowData[getPropertyColumnIndex("stepId")];
        const type: SearchDocumentType =
          rowData[getPropertyColumnIndex("type")];

        switch (type) {
          case SearchDocumentType.Schema:
            invariant(schemaId, "schema id must be defined");
            return (
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId!})
                  .toString()}
              >
                Schema: {schema ? schema.name : schemaId}
              </Link>
            );
          case SearchDocumentType.SdfDocument:
            return (
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .toString()}
              >
                SDF document: {sdfDocument ? sdfDocument.name : sdfDocumentId}
              </Link>
            );
          case SearchDocumentType.Slot:
            invariant(schemaId, "schema id must be defined");
            invariant(slotId, "slot id must be defined");
            return (
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId})
                  .slot({id: slotId})
                  .toString()}
              >
                Slot: {slot ? slot.roleName : slotId}
              </Link>
            );
          case SearchDocumentType.Step:
            invariant(schemaId, "schema id must be defined");
            invariant(stepId, "step id must be defined");
            return (
              <Link
                href={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .schemas.schema({id: schemaId})
                  .step({id: stepId})
                  .toString()}
              >
                Step: {step ? step.name : stepId}
              </Link>
            );
          default:
            return <span>{label}</span>;
        }
      },
    },
  },
  {
    name: "slot",
    options: {
      display: "false",
    },
  },
  {
    name: "slotId",
    options: {
      display: "false",
    },
  },
  {
    name: "step",
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
              rowsPerPageOptions: [],
              serverSide: true,
              sort: false,
              filter: false,
              onChangePage: (newPage: number) =>
                onChange({limit, offset: limit * newPage, query: queryText}),
              onChangeRowsPerPage: (newRowsPerPage: number) => {},
              setRowProps(_, rowIndex) {
                return {"data-cy": "row-" + rowIndex};
              },
            }}
          />
        );
      }}
    </Frame>
  );
};
