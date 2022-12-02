import { Constants } from "../constants";

const faqAction = {
  loading: (isLoading) => ({
    type: Constants.GET_FAQ_LOADING,
    isLoading: isLoading,
  }),
  request: () => ({
    type: Constants.GET_FAQ_REQUEST,
  }),
  success: (data) => ({
    type: Constants.GET_FAQ_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_FAQ_ERROR,
    error: error,
    data: {},
    isLoading: false,
  }),
};

export { faqAction };
