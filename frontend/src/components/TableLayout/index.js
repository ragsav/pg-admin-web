import { Grid, useTheme } from "@mui/material";
import { lazy, useMemo } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LOCAL_CONSTANTS } from "../../constants";
import { useAuthState } from "../../contexts/authContext";
import { TableDrawerList } from "../TableDrawerList";
// import TableView from "../../pages/TableView";

const RowView = lazy(() => import("../../pages/RowView"));
const AddRow = lazy(() => import("../../pages/AddRow"));
const TableView = lazy(() => import("../../pages/TableView"));

const TableLayout = () => {
  const { pmUser } = useAuthState();

  const authorizedTables = useMemo(() => {
    if (pmUser) {
      const c = pmUser.extractAuthorizedTables();
      return c;
    } else {
      return null;
    }
  }, [pmUser]);

  const stickyDrawer = useMemo(() => {
    return (
      <Grid item sm={0} md={0} lg={3} xl={2}>
        <TableDrawerList authorizedTables={authorizedTables} />
      </Grid>
    );
  }, []);

  return (
    <Grid container>
      {stickyDrawer}
      <Grid
        md={12}
        lg={9}
        xl={10}
        className="!h-[calc(100vh-66px)] !overflow-y-auto"
      >
        <Routes>
          {/* <Route
            index
            element={() => {
              return <div>hello</div>;
            }}
          /> */}
          <Route path={LOCAL_CONSTANTS.ROUTES.TABLE_VIEW.code}>
            <Route index element={<TableView />} />
            <Route
              path={LOCAL_CONSTANTS.ROUTES.ADD_ROW.code}
              element={<AddRow />}
            />
            <Route
              path={LOCAL_CONSTANTS.ROUTES.ROW_VIEW.code}
              element={<RowView />}
            />
          </Route>
        </Routes>
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default TableLayout;
