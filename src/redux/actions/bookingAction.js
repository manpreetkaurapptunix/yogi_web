import { Constants } from "../constants";

const createBookingAction = {
  request: (body) => ({
    type: Constants.CREATE_BOOKING_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.CREATE_BOOKING_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.CREATE_BOOKING_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.CREATE_BOOKING_ERROR,
    isLoading: isLoading,
  }),
};

const getCustBookingAction = {
  request: (body) => ({
    type: Constants.GET_CUST_BOOKING_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CUST_BOOKING_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_CUST_BOOKING_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_CUST_BOOKING_ERROR,
    isLoading: isLoading,
  }),
};

const getInsBookingAction = {
  request: (body) => ({
    type: Constants.GET_INST_BOOKING_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_INST_BOOKING_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_INST_BOOKING_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_INST_BOOKING_ERROR,
    isLoading: isLoading,
  }),
};

const custCancelBookingAction = {
  request: (params, body) => ({
    type: Constants.CUST_CANCEL_BOOKING_REQUEST,
    params,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.CUST_CANCEL_BOOKING_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.CUST_CANCEL_BOOKING_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.CUST_CANCEL_BOOKING_ERROR,
    isLoading: isLoading,
  }),
};

const addRatingAction = {
  request: (payload, body) => ({
    type: Constants.ADD_RATING_REQUEST,
    payload,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.ADD_RATING_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.ADD_RATING_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.ADD_RATING_ERROR,
    isLoading: isLoading,
  }),
};

const createReportAction = {
  request: (body) => ({
    type: Constants.CREATE_REPORT_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.CREATE_REPORT_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.CREATE_REPORT_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.CREATE_REPORT_ERROR,
    isLoading: isLoading,
  }),
};

const discountAction = {
  request: () => ({
    type: Constants.GET_DISCOUNT_REQUEST,
  }),
  success: (body) => ({
    type: Constants.GET_DISCOUNT_SUCCESS,
    data: body,
    loading: false,
  }),
  error: () => ({
    type: Constants.GET_DISCOUNT_ERROR,
    loading: false,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_DISCOUNT_LOADING,
    isLoading: isLoading,
  }),
};

export {
  createBookingAction,
  getCustBookingAction,
  getInsBookingAction,
  custCancelBookingAction,
  addRatingAction,
  createReportAction,
  discountAction,
};
