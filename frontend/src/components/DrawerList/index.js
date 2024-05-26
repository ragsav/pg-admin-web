import { PeopleAlt, Storage } from "@mui/icons-material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PolicyIcon from "@mui/icons-material/Policy";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { LOCAL_CONSTANTS } from "../../constants";
import { useAuthState } from "../../contexts/authContext";
import { TablesList } from "../TablesDrawerList";
import { GraphsList } from "../GraphsDrawerList";

export const DrawerList = ({ currentPageTitle, setCurrentPageTitle }) => {
  const { pmUser } = useAuthState();
  const theme = useTheme();

  const authorizedTables = useMemo(() => {
    if (pmUser) {
      const c = pmUser.extractAuthorizedTables();
      return c;
    } else {
      return null;
    }
  }, [pmUser]);

  console.log({ currentPageTitle, r: currentPageTitle?.includes("graph") });

  return (
    <Grid container className="!w-full">
      <Grid item xs={6} md={6} lg={5}>
        <List
          sx={{}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="!py-0 !h-[calc(100vh-66px)] !overflow-y-auto !overflow-x-hidden !border-r !border-white !border-opacity-10 w-full"
        >
          {
            <Link
              to={LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT}
              key={LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT}
              onClick={() => {
                setCurrentPageTitle(LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT);
              }}
            >
              <ListItem
                disablePadding
                selected={
                  LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT == currentPageTitle
                }
                sx={{
                  borderRight:
                    LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT == currentPageTitle
                      ? 3
                      : 0,
                  borderColor: theme.palette.primary.main,
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                  >
                    <PolicyIcon sx={{}} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        marginLeft: -2,
                        fontWeight:
                          LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT ==
                          currentPageTitle
                            ? "700"
                            : "500",
                      },
                    }}
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.POLICY_MANAGEMENT ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                    primary={"Roles Management"}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          }
          {
            <Link
              to={LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT}
              key={LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT}
              onClick={() => {
                setCurrentPageTitle(LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT);
              }}
            >
              <ListItem
                disablePadding
                selected={
                  LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT == currentPageTitle
                }
                sx={{
                  borderRight:
                    LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT ==
                    currentPageTitle
                      ? 3
                      : 0,
                  borderColor: theme.palette.primary.main,
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                  >
                    <PeopleAlt sx={{}} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        marginLeft: -2,
                        fontWeight:
                          LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT ==
                          currentPageTitle
                            ? "700"
                            : "500",
                      },
                    }}
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ACCOUNT_MANAGEMENT ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                    primary={"Accounts Management"}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          }
          {
            <Link
              to={LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code}
              key={LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code}
              onClick={() => {
                setCurrentPageTitle(LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code);
              }}
            >
              <ListItem
                disablePadding
                selected={
                  LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code == currentPageTitle
                }
                sx={{
                  borderRight:
                    LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code == currentPageTitle
                      ? 3
                      : 0,
                  borderColor: theme.palette.primary.main,
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                  >
                    <Storage sx={{}} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        marginLeft: -2,
                        fontWeight:
                          LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code ==
                          currentPageTitle
                            ? "700"
                            : "500",
                      },
                    }}
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ALL_TABLES.code ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                    primary={"Tables"}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          }
          {
            <Link
              to={LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code}
              key={LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code}
              onClick={() => {
                setCurrentPageTitle(LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code);
              }}
            >
              <ListItem
                disablePadding
                selected={
                  LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code == currentPageTitle
                }
                sx={{
                  borderRight:
                    LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code == currentPageTitle
                      ? 3
                      : 0,
                  borderColor: theme.palette.primary.main,
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                  >
                    <InsertChartIcon sx={{}} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        marginLeft: -2,
                        fontWeight:
                          LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code ==
                          currentPageTitle
                            ? "700"
                            : "500",
                      },
                    }}
                    sx={{
                      color:
                        LOCAL_CONSTANTS.ROUTES.ALL_GRAPHS.code ==
                        currentPageTitle
                          ? theme.palette.primary.main
                          : theme.palette.primary.contrastText,
                    }}
                    primary={"Graphs"}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          }
        </List>
      </Grid>
      {
        <Grid item xs={6} md={6} lg={7}>
          {String(currentPageTitle).includes("graph") ? (
            <GraphsList
              setCurrentPageTitle={setCurrentPageTitle}
              currentPageTitle={currentPageTitle}
            />
          ) : (
            <TablesList
              authorizedTables={authorizedTables}
              setCurrentPageTitle={setCurrentPageTitle}
              currentPageTitle={currentPageTitle}
            />
          )}
        </Grid>
      }
    </Grid>
  );
};
