import { Constants } from "../constants";

const wishlistAction = {
  request: (body, input) => ({
    type: Constants.ADD_WISHLIST_REQUEST,
    body,
    input,
  }),
  loading: (isLoading) => ({
    type: Constants.ADD_WISHLIST_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.ADD_WISHLIST_SUCCESS,
    payload: data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.ADD_WISHLIST_ERROR,
    error: error,
    data: {},
    isLoading: false,
  }),
};

const getWishlistAction = {
  request: () => ({
    type: Constants.GET_WISHLIST_REQUEST,
  }),
  loading: (isLoading) => ({
    type: Constants.GET_WISHLIST_LOADING,
    isLoading: isLoading,
  }),
  success: (data) => ({
    type: Constants.GET_WISHLIST_SUCCESS,
    data,
    isLoading: false,
  }),
  error: (error) => ({
    type: Constants.GET_WISHLIST_ERROR,
    error: error,
    data: {},
    isLoading: false,
  }),
};

export { wishlistAction, getWishlistAction };
