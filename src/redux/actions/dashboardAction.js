import { Constants } from "../constants";

const insDashAction = {
  request: (body) => ({
    type: Constants.GET_INT_DASHBOARD_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_INT_DASHBOARD_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_INT_DASHBOARD_SUCCESS,
    data: data,
    isLoading: false,
  }),
  error: (isLoading) => ({
    type: Constants.GET_INT_DASHBOARD_ERROR,
    data: {},
    isLoading: isLoading,
  }),
};

export { insDashAction };
