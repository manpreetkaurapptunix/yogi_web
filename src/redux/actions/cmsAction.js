import { Constants } from "../constants";

const aboutAction = {
  request: () => ({
    type: Constants.GET_ABOUT_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_ABOUT_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_ABOUT_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_ABOUT_ERROR,
    payload: {},
    error: error,
    isLoading: false,
  }),
};

export { aboutAction };
