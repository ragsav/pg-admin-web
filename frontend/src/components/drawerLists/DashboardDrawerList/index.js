import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getAllDashboardAPI } from "../../../api/dashboards";
import { LOCAL_CONSTANTS } from "../../../constants";
import { useAuthState } from "../../../contexts/authContext";
import { FaChalkboardTeacher, FaPlus, FaRedo } from "react-icons/fa";

export const DashboardsList = () => {
  const theme = useTheme();
  const routeParam = useParams();
  const currentPage = `dashboard_${routeParam?.["*"]}`;
  const { pmUser } = useAuthState();
  const navigate = useNavigate();
  const isAuthorizedToAddDashboard = useMemo(() => {
    return (
      pmUser && pmUser.extractAuthorizationForDashboardAddFromPolicyObject()
    );
  }, [pmUser]);
  const {
    isLoading: isLoadingDashboards,
    data: dashboards,
    error: loadDashboardsError,
    refetch: refetchDashboards,
  } = useQuery({
    queryKey: [`REACT_QUERY_KEY_DASHBOARD_LAYOUTS`],
    queryFn: () => getAllDashboardAPI(),
    cacheTime: 0,
    retry: 1,
    staleTime: Infinity,
  });

  const _navigateToAddMoreDashboard = () => {
    navigate(LOCAL_CONSTANTS.ROUTES.ADD_DASHBOARD_LAYOUT.path());
  };
  return (
    <List
      sx={{}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className=" !h-[calc(100vh-66px)] !overflow-y-auto !overflow-x-hidden !border-r !border-white !border-opacity-10 w-full"
    >
      <div className="!px-3.5 py-1 flex flex-row justify-between items-center w-full">
        <span className="!font-semibold">{"Dashboard Layouts"}</span>
        <IconButton onClick={refetchDashboards}>
          <FaRedo className="!text-sm" />
        </IconButton>
      </div>
      {isAuthorizedToAddDashboard && (
        <div className="!p-3 !w-full !pb-1.5">
          <Button
            onClick={_navigateToAddMoreDashboard}
            variant="contained"
            className="!w-full"
            startIcon={<FaPlus className="!text-sm" />}
          >
            Add more dashboards
          </Button>
        </div>
      )}

      {dashboards?.map((dashboard) => {
        const key = `dashboard_${dashboard.pm_dashboard_id}`;
        return (
          <Link
            to={LOCAL_CONSTANTS.ROUTES.GRAPH_VIEW.path(
              dashboard.pm_dashboard_id
            )}
            key={key}
          >
            <ListItem
              key={`_dashboard_${dashboard.pm_dashboard_id}`}
              disablePadding
              className="!px-3 !py-1.5"
            >
              <ListItemButton
                sx={{
                  background: theme.palette.background.default,
                  border: key == currentPage ? 1 : 0,
                  borderColor: theme.palette.primary.main,
                }}
                selected={key == currentPage}
                className="!rounded"
              >
                <ListItemIcon
                  className="!ml-1"
                  sx={{
                    color:
                      key == currentPage
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                  }}
                >
                  <FaChalkboardTeacher className="!text-sm" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color:
                      key == currentPage
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                  }}
                  primary={dashboard.dashboard_title}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: key == currentPage ? "700" : "500",
                      marginLeft: -2,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* <Divider className="!mx-4" /> */}
          </Link>
        );
      })}
    </List>
  );
};
