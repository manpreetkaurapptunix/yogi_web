import { Constants } from "../constants";

const initialState = {
  isLoading: false,
  bookingCreate: null,
  custBookingData: null,
  instBookingData: null,
  cancelCustBooking: null,
  addRatingData: null,
  createReportData: null,
  discountData: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.CREATE_BOOKING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        bookingCreate: action.data,
      };
    case Constants.CREATE_BOOKING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        bookingCreate: {},
      };

    case Constants.GET_CUST_BOOKING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_CUST_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        custBookingData: action.data,
      };
    case Constants.GET_CUST_BOOKING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        custBookingData: {},
      };

    case Constants.GET_INST_BOOKING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_INST_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        instBookingData: action.data,
      };
    case Constants.GET_INST_BOOKING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        instBookingData: {},
      };

    // Customer cancel booking
    case Constants.CUST_CANCEL_BOOKING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.CUST_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        cancelCustBooking: action.data,
      };
    case Constants.CUST_CANCEL_BOOKING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        cancelCustBooking: {},
      };

    // Add rating user
    case Constants.ADD_RATING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.ADD_RATING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        addRatingData: action.data,
      };
    case Constants.ADD_RATING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        addRatingData: {},
      };

    // Ceate report user
    case Constants.CREATE_REPORT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.CREATE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        createReportData: action.data,
      };
    case Constants.CREATE_BOOKING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        createReportData: {},
      };

    // Discount
    case Constants.GET_DISCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case Constants.GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        discountData: action.data,
      };
    case Constants.GET_DISCOUNT_ERROR:
      return {
        ...state,
        data: {},
        isLoading: false,
      };

    default:
      return state;
  }
};

export { bookingReducer };
