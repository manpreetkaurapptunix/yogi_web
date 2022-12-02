import { Constants } from "../constants";

const notificationListAction = {
  request: () => ({
    type: Constants.NOTIFICATION_LIST_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.NOTIFICATION_LIST_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.NOTIFICATION_LIST_SUCCESS,
    isLoading: false,
    data,
  }),
  error: (isLoading) => ({
    type: Constants.NOTIFICATION_LIST_ERROR,
    isLoading: isLoading,
  }),
};

export { notificationListAction };
