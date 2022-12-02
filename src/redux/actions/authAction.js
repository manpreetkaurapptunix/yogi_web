import { Constants } from "../constants";

const loginAction = {
  request: (body) => ({
    type: Constants.LOGIN_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.LOGIN_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading, data) => ({
    type: Constants.LOGIN_SUCCESS,
    isLoading: isLoading,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.LOGIN_ERROR,
    isLoading: isLoading,
  }),
};

const logoutAction = {
  request: () => ({
    type: Constants.LOGOUT_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.LOGOUT_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: Constants.LOGOUT_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: Constants.LOGOUT_ERROR,
    isLoading: isLoading,
  }),
};

const registerAction = {
  request: (body) => ({
    type: Constants.REGISTER_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.REGISTER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.REGISTER_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.REGISTER_ERROR,
    isLoading: isLoading,
  }),
};

const verifyOtpAction = {
  request: (body, route) => ({
    type: Constants.VERIFY_OTP_REQUEST,
    body: body,
    route,
  }),
  loading: (isLoading) => ({
    type: Constants.VERIFY_OTP_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading, data) => ({
    type: Constants.VERIFY_OTP_SUCCESS,
    isLoading: isLoading,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.VERIFY_OTP_ERROR,
    isLoading: isLoading,
  }),
};

const forgotPasswordAction = {
  request: (body) => ({
    type: Constants.FORGOT_PASSWORD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.FORGOT_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.FORGOT_PASSWORD_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.FORGOT_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

const resendOtpAction = {
  request: (body) => ({
    type: Constants.RESEND_OTP_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.RESEND_OTP_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: Constants.RESEND_OTP_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: Constants.RESEND_OTP_ERROR,
    isLoading: isLoading,
  }),
};

const resetPasswordAction = {
  request: (body, token) => ({
    type: Constants.RESET_PASSWORD_REQUEST,
    body,
    token,
  }),
  loading: (isLoading) => ({
    type: Constants.RESET_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (isLoading) => ({
    type: Constants.RESET_PASSWORD_SUCCESS,
    isLoading: isLoading,
  }),
  error: (isLoading) => ({
    type: Constants.RESET_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

const getProfileAction = {
  request: () => ({
    type: Constants.GET_PROFILE_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_PROFILE_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_PROFILE_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_PROFILE_ERROR,
    payload: {},
    error: error,
    isLoading: false,
  }),
};

const updatProfileAction = {
  request: (body) => ({
    type: Constants.UPDATE_PROFILE_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.UPDATE_PROFILE_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.UPDATE_PROFILE_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.UPDATE_PROFILE_ERROR,
    isLoading: isLoading,
    data: {},
  }),
};

const switchUserAction = {
  request: (body) => ({
    type: Constants.SWITCH_USER_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.SWITCH_USER_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.SWITCH_USER_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.SWITCH_USER_ERROR,
    isLoading: isLoading,
    data: {},
  }),
};

const changePasswordAction = {
  request: (body) => ({
    type: Constants.CHANGE_PASSWORD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.CHANGE_PASSWORD_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.CHANGE_PASSWORD_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.CHANGE_PASSWORD_ERROR,
    isLoading: isLoading,
  }),
};

const addBankDetailAction = {
  request: (body) => ({
    type: Constants.ADD_BANK_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.ADD_BANK_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.ADD_BANK_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.ADD_BANK_ERROR,
    isLoading: isLoading,
  }),
};

const sociallLoginAction = {
  request: (body) => ({
    type: Constants.SOCIAL_LOGIN_REQUEST,
    body,
  }),
  loading: (isLoading) => ({
    type: Constants.SOCIAL_LOGIN_LOADING,
    isLoading: isLoading,
  }),
  success: (body) => ({
    type: Constants.SOCIAL_LOGIN_SUCCESS,
    isLoading: false,
    body,
  }),
  error: (isLoading) => ({
    type: Constants.SOCIAL_LOGIN_ERROR,
    isLoading: isLoading,
  }),
};

export {
  loginAction,
  registerAction,
  verifyOtpAction,
  forgotPasswordAction,
  resendOtpAction,
  resetPasswordAction,
  getProfileAction,
  updatProfileAction,
  changePasswordAction,
  addBankDetailAction,
  logoutAction,
  switchUserAction,
  sociallLoginAction,
};
