import { Constants } from "../constants";

const initialState = {
  isDialogeOpen: false,
  modalCategory: null,
  isAuthorised: false,
  isInstructor: false,
  isRole: "user",
  tempData: null,
  uploadImage: null,
  socket: null,
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SHOW_DIALOG:
      return {
        ...state,
        isDialogeOpen: action.isOpen,
        modalCategory: action.dialogeType,
      };

    case Constants.HIDE_DIALOGE:
      return {
        ...state,
        isDialogeOpen: action.isClose,
      };

    case Constants.UPDATE_AUTHORIZATION:
      return {
        ...state,
        isAuthorised: action.isAuthorised,
      };
    case Constants.ROLE_SELECT:
      return {
        ...state,
        isRole: action.isRole,
      };

    case Constants.UPDATE_TEMP_DATA:
      return {
        ...state,
        tempData: { ...state.tempData, ...action.data },
      };

    case Constants.IMAGE_UPLOAD_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        uploadImage: action.data,
      };
    case Constants.IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        uploadImage: {},
      };

    case Constants.UPDATE_SOCKET_CONNECTION:
      return {
        ...state,
        socket: action.socket,
      };

    default:
      return state;
  }
};
