import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  classData: [],
  singleClass: null,
  addClass: null,
  categoryData: null,
  error: null,
  instructorClassData: null,
  instClassByIDData: null,
  getClassCat: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_CLASS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        classData: action.data,
      };
    case Constants.GET_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        classData: {},
      };
    //single class methods
    case Constants.SINGLE_CLASS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.SINGLE_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        singleClass: action.data,
      };
    case Constants.SINGLE_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        singleClass: {},
      };

    // Create Class Reducer
    case Constants.CREATE_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.CREATE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        addClass: action.data,
      };
    case Constants.CREATE_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        addClass: {},
      };

    // GET CATEGORY
    case Constants.GET_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        categoryData: action.data,
      };
    case Constants.GET_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.error,
        categoryData: {},
      };

    // GET INSTRUCTOR CLASS
    case Constants.GET_INSTRUCTOR_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_INSTRUCTOR_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        instructorClassData: action.data,
      };
    case Constants.GET_INSTRUCTOR_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.error,
        instructorClassData: {},
      };

    // DELETE INSTRUCTOR CLASS
    case Constants.DELETE_INSTRUCTOR_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.DELETE_INSTRUCTOR_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.DELETE_INSTRUCTOR_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    // GET INSTRUCTOR CLASS BY ID
    case Constants.INSTRUCTOR_CLASS_BYID_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.INSTRUCTOR_CLASS_BYID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        instClassByIDData: action.data,
      };
    case Constants.INSTRUCTOR_CLASS_BYID_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.error,
        instClassByIDData: {},
      };

    // UPDATE INSTRUCTOR CLASS BY ID
    case Constants.UPDATE_INS_CLASS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.UPDATE_INS_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.UPDATE_INS_CLASS_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    //GET_CLASS_BY CATEGORY

    case Constants.GET_CLASS_BYCAT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CLASS_BYCAT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        classData: action.data,
      };
    case Constants.GET_CLASS_BYCAT_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        classData: {},
      };

    default:
      return state;
  }
};

export { classReducer };
