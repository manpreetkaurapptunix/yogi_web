import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  faqResData: null,
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_FAQ_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_FAQ_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        faqResData: action.payload,
      };
    case Constants.GET_FAQ_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        faqResData: {},
      };

    default:
      return state;
  }
};

export { faqReducer };
