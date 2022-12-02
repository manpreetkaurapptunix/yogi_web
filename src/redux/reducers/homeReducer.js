import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  userDashboardData: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_USER_DASHBOARD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_USER_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userDashboardData: action.data,
      };
    case Constants.GET_USER_DASHBOARD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userDashboardData: {},
      };

    default:
      return state;
  }
};

export { homeReducer };
