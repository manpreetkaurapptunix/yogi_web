import { Constants } from "../constants";

const modalVisible = {
  modalOpen: (dialogeType) => ({
    type: Constants.SHOW_DIALOG,
    isOpen: true,
    dialogeType: dialogeType,
  }),
  modalClose: () => ({
    type: Constants.HIDE_DIALOGE,
    isClose: false,
  }),
};

const updateSocket = {
  connectSocket: (socket) => ({
    type: Constants.UPDATE_SOCKET_CONNECTION,
    socket: socket,
  }),
};

const resetAuth = {
  authorise: () => ({
    type: Constants.UPDATE_AUTHORIZATION,
    isAuthorised: true,
  }),
  unAuthorise: () => ({
    type: Constants.UPDATE_AUTHORIZATION,
    isAuthorised: false,
  }),
};

const roleAction = {
  success: (role) => ({
    type: Constants.ROLE_SELECT,
    isRole: role,
  }),
};

const tempData = {
  updateTempData: (data) => ({
    type: Constants.UPDATE_TEMP_DATA,
    data: data,
  }),
};

const imageUploadAction = {
  request: (body, token) => ({
    type: Constants.IMAGE_UPLOAD_REQUEST,
    body: body,
  }),
  loading: (isLoading) => ({
    type: Constants.IMAGE_UPLOAD_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.IMAGE_UPLOAD_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.IMAGE_UPLOAD_ERROR,
    isLoading: isLoading,
  }),
};

export {
  modalVisible,
  resetAuth,
  roleAction,
  tempData,
  imageUploadAction,
  updateSocket,
};
