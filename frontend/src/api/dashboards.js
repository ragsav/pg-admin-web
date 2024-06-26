import { LOCAL_CONSTANTS } from "../constants";
import { Dashboard } from "../models/data/dashboard";
import axiosInstance from "../utils/axiosInstance";

export const addDashboardAPI = async ({ data }) => {
  try {
    const response = await axiosInstance.post(
      LOCAL_CONSTANTS.APIS.DASHBOARD_LAYOUT.addDashboard(),
      data
    );
    if (response.data && response.data.success == true) {
      return true;
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};

export const updateDashboardAPI = async ({ data }) => {
  try {
    const response = await axiosInstance.put(
      LOCAL_CONSTANTS.APIS.DASHBOARD_LAYOUT.updateDashboard(),
      data
    );

    if (response.data && response.data.success == true) {
      return true;
    } else if (response.data && response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getDashboardByIDAPI = async ({ dashboardID }) => {
  try {
    const response = await axiosInstance.get(
      LOCAL_CONSTANTS.APIS.DASHBOARD_LAYOUT.getDashboardByID({
        id: dashboardID,
      })
    );
    if (response.data && response.data.success == true) {
      return new Dashboard(response.data.dashboard);
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteDashboardByIDAPI = async ({ dashboardID }) => {
  try {
    const response = await axiosInstance.delete(
      LOCAL_CONSTANTS.APIS.DASHBOARD_LAYOUT.deleteDashboardByID({
        id: dashboardID,
      })
    );
    if (response.data && response.data.success == true) {
      return true;
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllDashboardAPI = async () => {
  try {
    const response = await axiosInstance.get(
      LOCAL_CONSTANTS.APIS.DASHBOARD_LAYOUT.getAllDashboards()
    );
    if (response.data && response.data.success == true) {
      return Dashboard.toList(response.data.dashboards);
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};
