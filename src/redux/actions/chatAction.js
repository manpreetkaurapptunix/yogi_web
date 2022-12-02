import { Constants } from "../constants";

const getChatList = {
  request: (params) => ({
    type: Constants.GET_CHAT_LIST_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CHAT_LIST_LOADING,
    isLoading: isLoading,
  }),

  success: (data) => ({
    type: Constants.GET_CHAT_LIST_SUCCESS,
    data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_CHAT_LIST_ERROR,
    error: error,
    isLoading: false,
  }),
  update: (id, message) => ({
    type: Constants.GET_CHAT_LIST_UPDATE,
    id,
    message,
  }),
};

const getChatHistory = {
  request: (params) => ({
    type: Constants.GET_CHAT_HISTORY_REQUEST,
    params,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_CHAT_HISTORY_LOADING,
    isLoading: isLoading,
  }),

  success: (data) => ({
    type: Constants.GET_CHAT_HISTORY_SUCCESS,
    data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_CHAT_HISTORY_ERROR,
    error: error,
    isLoading: false,
  }),
  addToChat: (chat) => ({
    type: Constants.ADD_TO_CHAT,
    chat: chat,
  }),
};

export { getChatList, getChatHistory };
