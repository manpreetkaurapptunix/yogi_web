import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  chatList: [],
  chatHistory: [],
  totalChats: 0,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_CHAT_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        chatList: action.data,
      };
    case Constants.GET_CHAT_LIST_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CHAT_LIST_UPDATE:
      let id = -1;
      id = state.chatList.findIndex((item) => item?.userId == action.id);
      let chatsList = state.chatList;
      if (id != -1) {
        console.log(
          id,
          action.message,
          chatsList[id]?.lastMessage.text,
          action.id,
          "?????"
        );
        chatsList[id].lastMessage = {
          ...chatsList[id].lastMessage,
          text: action.message,
        };
      }

      console.log(chatsList, "chatsListchatsList");

      return {
        ...state,
        chatList: [...chatsList],
      };

    case Constants.GET_CHAT_HISTORY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        chatHistory: action.data?.data?.reverse(),
        totalChats: action.data?.total,
      };
    case Constants.ADD_TO_CHAT:
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.chat],
        totalChats: state.totalChats + 1,
      };
    case Constants.GET_CHAT_HISTORY_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
