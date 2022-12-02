import { applyMiddleware, combineReducers } from "redux";
import { commonReducer } from "./commonReducer";
import { classReducer } from "./classReducer";
import { authReducer } from "./authReducer";
import { aboutReducer } from "./cmsReducer";
import { faqReducer } from "./faqReducer";
import { bookingReducer } from "./bookingReducer";
import { membershipReducer } from "./membershipReducer";
import { homeReducer } from "./homeReducer";
import { wishlistReducer } from "./wishListReducer";
import { instDashboard } from "./dashboardReducer";
import { notifReducer } from "./notifReducer";
import { chatReducer } from "./chatReducer";

const reducer = combineReducers({
  authReducer: authReducer,
  commonReducer: commonReducer,
  classReducer: classReducer,
  aboutReducer: aboutReducer,
  faqReducer: faqReducer,
  bookingReducer: bookingReducer,
  membershipReducer: membershipReducer,
  homeReducer: homeReducer,
  wishlistReducer: wishlistReducer,
  instDashboard: instDashboard,
  notifReducer: notifReducer,
  chatReducer: chatReducer,
});

export default reducer;
