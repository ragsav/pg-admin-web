import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import { useMemo } from "react";
import { addRowAPI } from "../../api/post";
import { LOCAL_CONSTANTS } from "../../constants";
import { useAuthState } from "../../contexts/authContext";
import { useConstants } from "../../contexts/constantsContext";
import { displayError, displaySuccess } from "../../utils/notification";
import { ErrorComponent } from "../ErrorComponent";
import { FieldComponent } from "../FieldComponent";
import { getFormattedTableColumns } from "../../utils/tables";
import { getAuthorizedColumnsForAdd } from "../../api/tables";

export const RowAdditionForm = ({ tableName }) => {
  const {
    isLoading: isLoadingAddColumns,
    data: addColumns,
    error: loadAddColumnsError,
  } = useQuery({
    queryKey: [
      `REACT_QUERY_KEY_TABLES_${String(tableName).toUpperCase()}`,
      `add_column`,
    ],
    queryFn: () => getAuthorizedColumnsForAdd({ tableName }),
    cacheTime: 0,
    retry: 1,
    staleTime: Infinity,
  });

  const allColumns = useMemo(() => {
    if (addColumns) {
      const c = getFormattedTableColumns(addColumns);
      return c;
    } else {
      return null;
    }
  }, [addColumns]);

  const {
    isPending: isAddingRow,
    isSuccess: isAddingRowSuccess,
    isError: isAddingRowError,
    error: addRowError,
    mutate: addRow,
  } = useMutation({
    mutationFn: ({ tableName, data }) => {
      return addRowAPI({ tableName, data });
    },
    retry: false,
    onSuccess: () => {
      displaySuccess("Added record successfully");
    },
    onError: (error) => {
      displayError(error);
    },
  });
  const rowAdditionForm = useFormik({
    initialValues: {},
    validateOnMount: false,
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: (values) => {
      addRow({ tableName, data: values });
    },
  });
  return allColumns && allColumns.length > 0 ? (
    <div className="flex flex-col justify-start items-center w-full pb-5 p-2">
      <div className=" flex flex-row justify-between 2xl:w-3/5 xl:w-3/4 lg:w-2/3 md:w-full mt-3 ">
        <div className="flex flex-col items-start justify-start">
          <span className="text-lg font-bold text-start ">{`Add row`}</span>
          <span className="text-xs font-thin text-start text-slate-300">{`Table : ${tableName}`}</span>
        </div>

        <div className="flex flex-row items-center justify-end w-min">
          <Button
            disableElevation
            variant="contained"
            size="small"
            type="submit"
            startIcon={
              isAddingRow && <CircularProgress color="inherit" size={12} />
            }
            className="!ml-2"
            onClick={rowAdditionForm.handleSubmit}
          >
            <span className="!w-max">Add record</span>
          </Button>
        </div>
      </div>
      <Paper
        className="px-4 mt-3 2xl:w-3/5 xl:w-3/4 lg:w-2/3 md:w-full pb-3"
        variant="outlined"
      >
        <form onSubmit={rowAdditionForm.handleSubmit}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 1, sm: 1, md: 2 }}
            className="!mt-2"
          >
            {allColumns.map((column, index) => {
              return (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <FieldComponent
                    type={column.type}
                    name={column.field}
                    value={rowAdditionForm.values[column.field]}
                    onBlur={rowAdditionForm.handleBlur}
                    onChange={rowAdditionForm.handleChange}
                    helperText={rowAdditionForm.errors[column.field]}
                    error={Boolean(rowAdditionForm.errors[column.field])}
                    setFieldValue={rowAdditionForm.setFieldValue}
                  />
                </Grid>
              );
            })}
          </Grid>
        </form>
      </Paper>
    </div>
  ) : (
    <div className="p-3">
      <ErrorComponent error={LOCAL_CONSTANTS.ERROR_CODES.PERMISSION_DENIED} />
    </div>
  );
};
