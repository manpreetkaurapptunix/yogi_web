import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  notifData: null,
};

export const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.NOTIFICATION_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        notifData: action.data,
      };
    case Constants.NOTIFICATION_LIST_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        notifData: {},
      };

    default:
      return state;
  }
};
