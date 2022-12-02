import { all } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import CmsSaga from "./CmsSaga";
import FaqSaga from "./FaqSaga";
import ClassSaga from "./ClassSaga";
import MembershipSaga from "./MembershipSaga";
import BookingSaga from "./BookingSaga";
import HomeSaga from "./HomeSaga";
import WishlistSaga from "./WishlistSaga";
import instDashboard from "./DashboardSaga";
import NotifSaga from "./NotifSaga";
import ChatSaga from "./ChatSaga";

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    ClassSaga(),
    CmsSaga(),
    FaqSaga(),
    MembershipSaga(),
    FaqSaga(),
    BookingSaga(),
    HomeSaga(),
    WishlistSaga(),
    instDashboard(),
    ChatSaga(),
    NotifSaga(),
  ]);
}
