import { Constants } from "../constants";
const initialState = {
  isLoading: false,
  insDashData: null,
};

const instDashboard = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_INT_DASHBOARD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_INT_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        insDashData: action.data,
      };
    case Constants.GET_INT_DASHBOARD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        insDashData: {},
      };

    default:
      return state;
  }
};

export { instDashboard };
