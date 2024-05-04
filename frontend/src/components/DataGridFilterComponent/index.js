import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { useFormik, useFormikContext } from "formik";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from "@mui/material";
import {
  Close,
  ExpandMore,
  Filter,
  FilterList,
  Replay,
} from "@mui/icons-material";
import { LOCAL_CONSTANTS } from "../../constants";

import { FieldComponent } from "../FieldComponent";
import { useConstants } from "../../contexts/constantsContext";
import { getFieldType, getAllTableFields } from "../../utils/tables";
import { useAuthState } from "../../contexts/authContext";
import moment from "moment";

export const DataGridFilterComponent = ({
  tableName,
  setFilters,
  filters,
  isFilterMenuOpen,
  handleCLoseFilterMenu,
  combinator,
  setCombinator,
}) => {
  const { dbModel } = useConstants();
  const { pmUser } = useAuthState();

  const [filterField, setFilterField] = useState("");
  const [filterOperator, setFilterOperator] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const _handleChangeCombinator = (e) => {
    setCombinator(e.target.value);
  };

  const authorizedColumns = useMemo(() => {
    if (pmUser && dbModel && tableName) {
      const u = pmUser;
      const c = u.extractAuthorizedColumnsForReadFromPolicyObject(tableName);
      if (c === true) {
        return getAllTableFields(dbModel, tableName);
      } else if (c === false) {
        return null;
      } else {
        const a = getAllTableFields(dbModel, tableName);

        return a.filter((header) => {
          return c.includes(header.field);
        });
      }
    } else {
      return null;
    }
  }, [pmUser, tableName, dbModel]);

  const fieldType = useMemo(() => {
    if (dbModel && tableName && filterField) {
      return getFieldType(dbModel, tableName, filterField);
    }
  }, [dbModel, tableName, filterField]);

  console.log({ fieldType });

  const _handleChangeFilterField = (e) => {
    setFilterField(e.target.value);
  };

  const _handleChangeFilterOperator = (e) => {
    setFilterOperator(e.target.value);
  };

  const _handleFilterValue = (e) => {
    if (fieldType) {
      let v = "";
      switch (fieldType) {
        case LOCAL_CONSTANTS.DATA_TYPES.STRING:
          v = e.target.value;
          break;
        case LOCAL_CONSTANTS.DATA_TYPES.BOOLEAN:
          v = e.target.value;
          break;
        case LOCAL_CONSTANTS.DATA_TYPES.DATETIME:
          v = moment(e).toDate();
          break;
        case LOCAL_CONSTANTS.DATA_TYPES.INT:
          v = parseInt(e.target.value);
          break;
        default:
          v = e.target.value;
      }
      setFilterValue(v);
    }
  };

  const _handleAddFilter = (e) => {
    e.preventDefault();
    if (filterField && filterOperator && filterValue) {
      const _filter = {
        field: filterField,
        operator: filterOperator,
        value: filterValue,
      };
      setFilters([...filters, { ..._filter }]);
    }
  };

  return (
    <Dialog
      open={isFilterMenuOpen}
      onClose={handleCLoseFilterMenu}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle className=" !text-lg !flex flex-row justify-between items-center w-full">
        Filters
        <IconButton aria-label="close" onClick={handleCLoseFilterMenu}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      {/* <Divider /> */}
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Select
              name="combinator"
              onChange={_handleChangeCombinator}
              value={combinator}
              IconComponent={ExpandMore}
              size="small"
              className=""
              fullWidth
            >
              <MenuItem
                value={"OR"}
                className="!break-words !whitespace-pre-line"
                key={"OR"}
              >
                {"OR"}
              </MenuItem>
              <MenuItem
                value={"AND"}
                className="!break-words !whitespace-pre-line"
                key={"AND"}
              >
                {"AND"}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              name="field"
              onChange={_handleChangeFilterField}
              value={filterField}
              IconComponent={ExpandMore}
              size="small"
              className=""
              fullWidth
            >
              {authorizedColumns?.map((column, index) => {
                return (
                  <MenuItem
                    value={column.field}
                    className="!break-words !whitespace-pre-line"
                    key={index}
                  >
                    {column.headerName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          {
            <Grid item xs={12} sm={4}>
              <Select
                name="operator"
                onChange={_handleChangeFilterOperator}
                value={filterOperator}
                IconComponent={ExpandMore}
                size="small"
                className=""
                fullWidth
              >
                {Object.keys(LOCAL_CONSTANTS.TABLE_FILTERS).map(
                  (operator, index) => {
                    return (
                      <MenuItem
                        value={operator}
                        className="!break-words !whitespace-pre-line"
                        key={index}
                      >
                        {operator}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </Grid>
          }
          {fieldType && (
            <Grid item xs={12} sm={12}>
              <FieldComponent
                name="value"
                type={fieldType}
                value={filterValue}
                onChange={_handleFilterValue}
                required={true}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disableElevation
          variant="contained"
          size="small"
          onClick={_handleAddFilter}
        >
          Apply filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
