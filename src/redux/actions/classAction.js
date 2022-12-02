import { Constants } from "../constants";

const classAction = {
  request: (params) => ({
    type: Constants.GET_CLASS_REQUEST,
    params: params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading, data) => ({
    type: Constants.GET_CLASS_SUCCESS,
    isLoading: isLoading,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_CLASS_ERROR,
    isLoading: isLoading,
  }),
};

const singleClassAction = {
  request: (params) => ({
    type: Constants.SINGLE_CLASS_REQUEST,
    params: params,
  }),
  loading: (isLoading) => ({
    type: Constants.SINGLE_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading, data) => ({
    type: Constants.SINGLE_CLASS_SUCCESS,
    isLoading: isLoading,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.SINGLE_CLASS_ERROR,
    isLoading: isLoading,
  }),
};

const createClassAction = {
  request: (body) => ({
    type: Constants.CREATE_CLASS_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.CREATE_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.CREATE_CLASS_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.CREATE_CLASS_ERROR,
    isLoading: isLoading,
  }),
};

const getCategoryAction = {
  request: (params) => ({
    type: Constants.GET_CATEGORY_REQUEST,
    params: params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CATEGORY_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_CATEGORY_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (error) => ({
    type: Constants.GET_CATEGORY_ERROR,
    isLoading: false,
    error,
  }),
};

const getClassByCatAction = {
  request: (params) => ({
    type: Constants.GET_CLASS_BYCAT_REQUEST,
    params: params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CLASS_BYCAT_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_CLASS_BYCAT_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (error) => ({
    type: Constants.GET_CLASS_BYCAT_ERROR,
    isLoading: false,
    error,
  }),
};

const getInstructorClassAction = {
  request: () => ({
    type: Constants.GET_INSTRUCTOR_CLASS_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_INSTRUCTOR_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_INSTRUCTOR_CLASS_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.GET_INSTRUCTOR_CLASS_ERROR,
    isLoading: isLoading,
  }),
};

const deleteInstructorClassAction = {
  request: (params) => ({
    type: Constants.DELETE_INSTRUCTOR_CLASS_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.DELETE_INSTRUCTOR_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.DELETE_INSTRUCTOR_CLASS_SUCCESS,
    isLoading: false,
  }),
  error: (isLoading) => ({
    type: Constants.DELETE_INSTRUCTOR_CLASS_ERROR,
    isLoading: isLoading,
  }),
};

const instClassByIdAction = {
  request: (params) => ({
    type: Constants.INSTRUCTOR_CLASS_BYID_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.INSTRUCTOR_CLASS_BYID_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.INSTRUCTOR_CLASS_BYID_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (error) => ({
    type: Constants.GET_INSTRUCTOR_CLASS_ERROR,
    isLoading: false,
    error,
  }),
};

const updateInsClassAction = {
  request: (params) => ({
    type: Constants.UPDATE_INS_CLASS_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.UPDATE_INS_CLASS_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: Constants.UPDATE_INS_CLASS_SUCCESS,
    isLoading,
  }),
  error: (isLoading) => ({
    type: Constants.UPDATE_INS_CLASS_ERROR,
    isLoading,
  }),
};

export {
  classAction,
  createClassAction,
  singleClassAction,
  getCategoryAction,
  getInstructorClassAction,
  deleteInstructorClassAction,
  instClassByIdAction,
  updateInsClassAction,
  getClassByCatAction,
};
