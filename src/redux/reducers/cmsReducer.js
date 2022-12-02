import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  aboutData: null,
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_ABOUT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_ABOUT_SUCCESS:
      return {
        ...state,
        aboutData: action.payload,
        isLoading: action.isLoading,
      };
    case Constants.GET_ABOUT_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        aboutData: {},
      };

    default:
      return state;
  }
};

export { aboutReducer };
