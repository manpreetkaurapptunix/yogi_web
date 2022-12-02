import { Constants } from "../constants";

const getUserDashAction = {
  request: (body, params) => ({
    type: Constants.GET_USER_DASHBOARD_REQUEST,
    body,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_USER_DASHBOARD_LOADING,
    isLoading: isLoading,
  }),

  success: (data) => ({
    type: Constants.GET_USER_DASHBOARD_SUCCESS,
    data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_USER_DASHBOARD_ERROR,
    error: error,
    isLoading: false,
  }),
};

export { getUserDashAction };
