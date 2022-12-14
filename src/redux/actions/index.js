import {
  classAction,
  createClassAction,
  singleClassAction,
  getCategoryAction,
  getInstructorClassAction,
  deleteInstructorClassAction,
  instClassByIdAction,
  updateInsClassAction,
  getClassByCatAction,
} from "./classAction";
import {
  resetAuth,
  modalVisible,
  roleAction,
  tempData,
  imageUploadAction,
  updateSocket,
} from "./commonAction";
import {
  registerAction,
  loginAction,
  verifyOtpAction,
  forgotPasswordAction,
  resendOtpAction,
  resetPasswordAction,
  getProfileAction,
  updatProfileAction,
  changePasswordAction,
  addBankDetailAction,
  logoutAction,
  switchUserAction,
  sociallLoginAction,
} from "./authAction";

import { aboutAction } from "./cmsAction";
import { faqAction } from "./faqAction";
import {
  createBookingAction,
  getCustBookingAction,
  getInsBookingAction,
  custCancelBookingAction,
  addRatingAction,
  createReportAction,
  discountAction,
} from "./bookingAction";
import {
  membershipAction,
  membershipGetAction,
  membershipDeleteAction,
  membershipGetIDAction,
  membershipUpdateAction,
  getInstSubscriptionAction,
  buySubscriptionAction,
  getUserMemberAction,
} from "./membershipAction";
import { getUserDashAction } from "./homeAction";
import { wishlistAction, getWishlistAction } from "./wishlistAction";
import { insDashAction } from "./dashboardAction";
import { notificationListAction } from "./notifAction";
import { getChatList, getChatHistory } from "./chatAction";

export {
  resetAuth,
  modalVisible,
  loginAction,
  registerAction,
  roleAction,
  tempData,
  imageUploadAction,
  verifyOtpAction,
  forgotPasswordAction,
  resendOtpAction,
  resetPasswordAction,
  getProfileAction,
  updatProfileAction,
  changePasswordAction,
  addBankDetailAction,
  aboutAction,
  faqAction,
  classAction,
  createClassAction,
  singleClassAction,
  getCategoryAction,
  logoutAction,
  getInstructorClassAction,
  deleteInstructorClassAction,
  instClassByIdAction,
  updateInsClassAction,
  switchUserAction,
  getClassByCatAction,
  createBookingAction,
  getCustBookingAction,
  membershipAction,
  membershipGetAction,
  getInsBookingAction,
  membershipDeleteAction,
  membershipGetIDAction,
  membershipUpdateAction,
  getInstSubscriptionAction,
  buySubscriptionAction,
  getUserMemberAction,
  getUserDashAction,
  custCancelBookingAction,
  addRatingAction,
  createReportAction,
  wishlistAction,
  getWishlistAction,
  sociallLoginAction,
  insDashAction,
  discountAction,
  notificationListAction,
  updateSocket,
  getChatList,
  getChatHistory,
};
