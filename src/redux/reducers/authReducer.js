import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  userData: null,
  profileData: null,
  passChange: null,
  updateProfile: null,
  userData: null,
  socialData: null,
  forgorRes: null,
  addBank: null,
  forgotOtp: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.data,
      };
    case Constants.LOGIN_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
      };

    case Constants.SWITCH_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.SWITCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.data,
      };
    case Constants.SWITCH_USER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
      };

    case Constants.LOGOUT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
      };
    case Constants.LOGOUT_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
      };
    case Constants.REGISTER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.data,
      };
    case Constants.REGISTER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
      };
    case Constants.VERIFY_OTP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.data,
        forgotOtp: action.data,
      };
    case Constants.VERIFY_OTP_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: {},
        forgotOtp: null,
      };
    case Constants.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        forgorRes: action.data,
      };
    case Constants.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        forgorRes: null,
      };
    case Constants.RESEND_OTP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.RESEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.RESEND_OTP_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.RESET_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.payload,
      };
    case Constants.GET_PROFILE_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userData: action.payload,
        error: action.error,
      };
    case Constants.UPDATE_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        updateProfile: action.data,
      };
    case Constants.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        updateProfile: action.data,
      };
    case Constants.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        passChange: action.data,
      };
    case Constants.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.ADD_BANK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.ADD_BANK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        addBank: action.data,
      };
    case Constants.ADD_BANK_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        addBank: null,
      };

    case Constants.SOCIAL_LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        socialData: action.data,
      };
    case Constants.SOCIAL_LOGIN_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        socialData: {},
      };
    default:
      return state;
  }
};

export { authReducer };
