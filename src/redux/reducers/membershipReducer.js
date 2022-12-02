import { Constants } from "../constants";

const initialState = {
  isLoading: "false",
  data: null,
  getData: null,
  memberData: null,
  getSingleData: null,
  instSubData: null,
  buySubData: null,
  userMemberData: null,
};

const membershipReducer = (state = initialState, action) => {
  switch (action.type) {
    //Add Member Cases
    case Constants.ADD_MEMBER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        memberData: action.data,
      };
    case Constants.ADD_MEMBER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        memberData: {},
      };

    //Get Member Cases
    case Constants.GET_MEMBER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.GET_MEMBER_SUCCESS:
      return {
        ...state,
        getData: action.data,
        isLoading: false,
      };

    case Constants.GET_MEMBER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    //Get Single Member Cases
    case Constants.GET_SINGLE_MEMBER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.GET_SINGLE_MEMBER_SUCCESS:
      return {
        ...state,
        getSingleData: action.data,
        isLoading: false,
      };

    case Constants.GET_SINGLE_MEMBER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    //Update Member Cases
    case Constants.UPDATE_MEMBER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.UPDATE_MEMBER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    //Get instructor subscription
    case Constants.GET_INST_SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.GET_INST_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        instSubData: action.data,
      };

    case Constants.GET_INST_SUBSCRIPTION_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        instSubData: {},
      };

    //Buy subscription
    case Constants.BUY_SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.BUY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        buySubData: action.body,
      };

    case Constants.BUY_SUBSCRIPTION_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        buySubData: {},
      };

    //Get USER  subscription
    case Constants.GET_USER_MEMBER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case Constants.GET_USER_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userMemberData: action.data,
      };

    case Constants.GET_USER_MEMBER_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        userMemberData: {},
      };

    default:
      return state;
  }
};

export { membershipReducer };
