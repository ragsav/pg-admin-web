import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../contexts/authContext";

import { Chip, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllRowsAPI } from "../../api/tables";

import { LOCAL_CONSTANTS } from "../../constants";
import { useConstants } from "../../contexts/constantsContext";
import { Loading } from "../Loading";

import moment from "moment";
import "react-data-grid/lib/styles.css";
import { BiCalendar } from "react-icons/bi";
import { DataGridActionComponent } from "../../components/DataGridActionComponent";
import { ErrorComponent } from "../../components/ErrorComponent";
import { RawDataGridStatistics } from "../../components/RawDataGridStatistics";

const PolicyManagement = () => {
  const tableName = LOCAL_CONSTANTS.STRINGS.POLICY_OBJECT_TABLE_NAME;

  const { pmUser } = useAuthState();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState(null);
  const [sortModel, setSortModel] = useState(null);
  const {
    isLoading: isLoadingAllPolicies,
    data: data,
    isError: isLoadAllPoliciesError,
    error: loadAllPoliciesError,
    isFetching: isFetchingAllAllPolicies,
    isPreviousData: isPreviousAllPoliciesData,
    refetch: reloadAllPolicies,
  } = useQuery({
    queryKey: [
      `REACT_QUERY_KEY_TABLES_${String(tableName).toUpperCase()}`,
      page,
      filterQuery,
      sortModel,
    ],
    queryFn: () =>
      fetchAllRowsAPI({
        tableName,
        page,
        filterQuery: filterQuery,
        sortModel: sortModel,
      }),

    enabled: Boolean(pmUser),
    cacheTime: 0,
    retry: 0,
    staleTime: Infinity,
    keepPreviousData: true,
  });

  const getRowId = (row) => {
    return row.pm_policy_object_id;
  };

  const columns = [
    { field: "pm_policy_object_id", headerName: "User ID" },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "created_at",
      headerName: "Created at",
      width: 300,
      valueGetter: (value, row) => {
        return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
      },
      renderCell: (params) => {
        return (
          <Chip
            label={`${params.value}`}
            size="small"
            variant="outlined"
            color={"secondary"}
            icon={<BiCalendar className="!text-sm" />}
            sx={{
              borderRadius: 1,
            }}
          />
        );
      },
    },
    {
      field: "updated_at",
      headerName: "Updated at",
      width: 300,
      valueGetter: (value, row) => {
        return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
      },
      renderCell: (params) => {
        return (
          <Chip
            label={`${params.value}`}
            size="small"
            variant="outlined"
            color={"secondary"}
            icon={<BiCalendar className="!text-sm" />}
            sx={{
              borderRadius: 1,
            }}
          />
        );
      },
    },
  ];
  return (
    <div>
      <div className={`!w-full !p-4`}>
        <RawDataGridStatistics
          tableName={tableName}
          altTableName={"Policy management"}
          filterQuery={filterQuery}
        />
        <DataGridActionComponent
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          reloadData={reloadAllPolicies}
          tableName={tableName}
          setSortModel={setSortModel}
          sortModel={sortModel}
          addRowNavigation={LOCAL_CONSTANTS.ROUTES.ADD_POLICY.path()}
        />
      </div>
      {isLoadingAllPolicies ? (
        <Loading />
      ) : data?.rows && pmUser ? (
        <div className="px-4">
          <DataGrid
            rows={data.rows}
            loading={isLoadingAllPolicies || isFetchingAllAllPolicies}
            columns={columns}
            initialState={{}}
            editMode="row"
            hideFooterPagination={true}
            hideFooterSelectedRowCount={true}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={getRowId}
            hideFooter={true}
            onRowClick={(param) => {
              navigate(
                LOCAL_CONSTANTS.ROUTES.POLICY_SETTINGS.path(
                  JSON.stringify({
                    pm_policy_object_id: param.row.pm_policy_object_id,
                  })
                )
              );
            }}
            disableColumnFilter
            sortingMode="server"
            autoHeight={true}
            rowHeight={200}
            getRowHeight={() => "auto"}
          />
          <div className="flex flex-row w-full justify-end pb-2">
            <Pagination
              count={Boolean(data?.nextPage) ? page + 1 : page}
              page={page}
              onChange={(e, page) => {
                setPage(page);
              }}
              hideNextButton={!Boolean(data?.nextPage)}
              variant="text"
              shape="rounded"
              className="!mt-2"
              siblingCount={1}
            />
          </div>
        </div>
      ) : (
        <div className="!w-full !p-4">
          <ErrorComponent
            error={
              loadAllPoliciesError || LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR
            }
          />
        </div>
      )}
    </div>
  );
};

export default PolicyManagement;
