import {
  SsidChart,
  BarChart,
  DataUsage,
  TableRows,
  TrackChanges,
} from "@mui/icons-material";
import DataObjectIcon from "@mui/icons-material/DataObject";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getAllDashboardLayoutAPI } from "../../api/dashboardLayouts";
import { LOCAL_CONSTANTS } from "../../constants";
import { useAuthState } from "../../contexts/authContext";
import { useMemo } from "react";

export const DashboardLayoutsList = ({
  setCurrentPageTitle,
  currentPageTitle,
}) => {
  const theme = useTheme();
  const { pmUser } = useAuthState();
  const navigate = useNavigate();
  const isAuthorizedToAddDashboardLayout = useMemo(() => {
    return (
      pmUser &&
      pmUser.extractAuthorizationForDashboardLayoutAddFromPolicyObject()
    );
  }, [pmUser]);
  const {
    isLoading: isLoadingDashboardLayouts,
    data: dashboardLayouts,
    error: loadDashboardLayoutsError,
    refetch: refetchDashboardLayouts,
  } = useQuery({
    queryKey: [`REACT_QUERY_KEY_DASHBOARD_LAYOUTS`],
    queryFn: () => getAllDashboardLayoutAPI(),
    cacheTime: 0,
    retry: 1,
    staleTime: Infinity,
  });

  const _navigateToAddMoreDashboardLayout = () => {
    navigate(LOCAL_CONSTANTS.ROUTES.ADD_DASHBOARD_LAYOUT.path());
  };
  return (
    <List
      sx={{}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className=" !h-[calc(100vh-66px)] !overflow-y-auto !overflow-x-hidden !border-r !border-white !border-opacity-10 w-full"
    >
      <ListItemButton>
        <ListItemIcon>
          <TableRows sx={{}} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: { marginLeft: -2 },
          }}
          primary="Dashboard Layouts"
        />
      </ListItemButton>
      {isAuthorizedToAddDashboardLayout && (
        <div className="!p-3 !w-full">
          <Button
            onClick={_navigateToAddMoreDashboardLayout}
            variant="contained"
            className="!w-full"
          >
            Add more dashboards
          </Button>
        </div>
      )}

      {dashboardLayouts?.map((dashboardLayout) => {
        const key = `dashboard_layout_${dashboardLayout.pm_dashboard_layout_id}`;
        return (
          <Link
            to={LOCAL_CONSTANTS.ROUTES.GRAPH_VIEW.path(
              dashboardLayout.pm_dashboard_layout_id
            )}
            onClick={() => {
              setCurrentPageTitle(key);
            }}
            key={key}
          >
            <ListItem
              key={`_dashboard_layout_${dashboardLayout.pm_dashboard_layout_id}`}
              disablePadding
              sx={{
                borderRight: key == currentPageTitle ? 3 : 0,
                borderColor: theme.palette.primary.main,
              }}
            >
              <ListItemButton
                sx={{ background: theme.palette.background.default }}
                selected={key == currentPageTitle}
              >
                <ListItemIcon
                  className="!ml-1"
                  sx={{
                    color:
                      key == currentPageTitle
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                  }}
                >
                  <SsidChart sx={{ fontSize: 16 }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color:
                      key == currentPageTitle
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                  }}
                  primary={dashboardLayout.title}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: key == currentPageTitle ? "700" : "500",
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
