import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  wishlistData: null,
  getWishlistData: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.ADD_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        wishlistData: action.payload,
      };
    case Constants.ADD_WISHLIST_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        wishlistData: {},
      };

    // GET_WISHLIST

    case Constants.GET_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        getWishlistData: action.data,
      };
    case Constants.GET_WISHLIST_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        getWishlistData: {},
      };

    default:
      return state;
  }
};

export { wishlistReducer };
