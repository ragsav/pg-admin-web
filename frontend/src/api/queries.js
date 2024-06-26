import { LOCAL_CONSTANTS } from "../constants";
import { Query } from "../models/data/query";

import axiosInstance from "../utils/axiosInstance";

export const addQueryAPI = async ({ data }) => {
  try {
    const response = await axiosInstance.post(
      LOCAL_CONSTANTS.APIS.QUERY.addQuery(),
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

export const updateQueryAPI = async ({ data }) => {
  try {
    const response = await axiosInstance.put(
      LOCAL_CONSTANTS.APIS.QUERY.updateQuery(),
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

export const getQueryByIDAPI = async ({ queryID }) => {
  try {
    const response = await axiosInstance.get(
      LOCAL_CONSTANTS.APIS.QUERY.getQueryByID({
        id: queryID,
      })
    );
    if (response.data && response.data.success == true) {
      return new Query(response.data.query);
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteQueryByIDAPI = async ({ queryID }) => {
  try {
    const response = await axiosInstance.delete(
      LOCAL_CONSTANTS.APIS.QUERY.deleteQueryByID({
        id: queryID,
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

export const getAllQueryAPI = async () => {
  try {
    const response = await axiosInstance.get(
      LOCAL_CONSTANTS.APIS.QUERY.getAllQueries()
    );
    if (response.data && response.data.success == true) {
      return Query.toList(response.data.queries);
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};

export const runPGQueryAPI = async ({ query }) => {
  try {
    const response = await axiosInstance.post(
      LOCAL_CONSTANTS.APIS.QUERY.runPGQuery(),
      { query }
    );
    if (response.data && response.data.success == true) {
      return response.data.data;
    } else if (response.data.error) {
      throw response.data.error;
    } else {
      throw LOCAL_CONSTANTS.ERROR_CODES.SERVER_ERROR;
    }
  } catch (error) {
    throw error;
  }
};
