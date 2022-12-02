import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* wishlistCall(payload) {
  console.log({ payload });
  try {
    yield put(actions.wishlistAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.WISHLIST);

    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.wishlistAction.success(res.data));

      let params = {
        guestMode: false,
      };
      yield put(actions.getUserDashAction.request(payload?.input, params));

      // yield put(
      //   actions.singleClassAction.request(payload?.body?.classId, params)
      // );

      yield put(actions.getWishlistAction.request());

      yield delay(1000);
    } else {
      yield put(actions.wishlistAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.wishlistAction.error(false));
  }
}

export function* getWishlistCall(payload) {
  try {
    yield put(actions.getWishlistAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, {}, url.WISHLIST);

    if (res?.statusCode == 200) {
      yield put(actions.getWishlistAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getWishlistAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getWishlistAction.error(false));
  }
}

function* WishlistSaga() {
  yield all([takeEvery(Constants.ADD_WISHLIST_REQUEST, wishlistCall)]);
  yield all([takeEvery(Constants.GET_WISHLIST_REQUEST, getWishlistCall)]);
}

export default WishlistSaga;
