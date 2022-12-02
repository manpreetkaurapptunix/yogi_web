import { Constants } from "../constants";

// Create Membership card
const membershipAction = {
  request: (body) => ({
    type: Constants.ADD_MEMBER_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.ADD_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading, data) => ({
    type: Constants.ADD_MEMBER_SUCCESS,
    isLoading: isLoading,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.ADD_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

// Get Membership List
const membershipGetAction = {
  request: () => ({
    type: Constants.GET_MEMBER_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_MEMBER_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

// Delete Membership card
const membershipDeleteAction = {
  request: (param) => ({
    type: Constants.DELETE_MEMBER_REQUEST,
    data: param,
  }),
  loading: (isLoading) => ({
    type: Constants.DELETE_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.DELETE_MEMBER_SUCCESS,
    isLoading: false,
  }),
  error: (isLoading) => ({
    type: Constants.DELETE_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

// Get Single Membership card
const membershipGetIDAction = {
  request: (data) => ({
    type: Constants.GET_SINGLE_MEMBER_REQUEST,
    data: data,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_SINGLE_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_SINGLE_MEMBER_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_SINGLE_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

// Update Single Membership card
const membershipUpdateAction = {
  request: (data, id) => ({
    type: Constants.UPDATE_MEMBER_REQUEST,
    data: data,
    id: id,
  }),
  loading: (isLoading) => ({
    type: Constants.UPDATE_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.UPDATE_MEMBER_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.UPDATE_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

// GET INSTRUCTOR SUBSCRIPTION
const getInstSubscriptionAction = {
  request: (params) => ({
    type: Constants.GET_INST_SUBSCRIPTION_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_INST_SUBSCRIPTION_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_INST_SUBSCRIPTION_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_INST_SUBSCRIPTION_ERROR,
    isLoading: isLoading,
  }),
};

// BUY SUBSCRIPTION
const buySubscriptionAction = {
  request: (body) => ({
    type: Constants.BUY_SUBSCRIPTION_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.BUY_SUBSCRIPTION_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.BUY_SUBSCRIPTION_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.BUY_SUBSCRIPTION_ERROR,
    isLoading: isLoading,
  }),
};

const getUserMemberAction = {
  request: (body) => ({
    type: Constants.GET_USER_MEMBER_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_USER_MEMBER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_USER_MEMBER_SUCCESS,
    isLoading: false,
    data: data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_USER_MEMBER_ERROR,
    isLoading: isLoading,
  }),
};

export {
  membershipAction,
  membershipGetAction,
  membershipDeleteAction,
  membershipUpdateAction,
  membershipGetIDAction,
  getInstSubscriptionAction,
  buySubscriptionAction,
  getUserMemberAction,
};
