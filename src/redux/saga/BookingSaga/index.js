import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* createBookingCall(payload) {
  try {
    yield put(actions.createBookingAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.CUSTOMER_BOOKING);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.createBookingAction.success(res.data));
      // yield put(actions.getInstructorClassAction.request());
      yield delay(1000);
    } else {
      yield put(actions.createBookingAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.createBookingAction.error(false));
  }
}

export function* getCustBookingCall(payload) {
  try {
    yield put(actions.getCustBookingAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      payload.body,
      url.CUSTOMER_BOOKING + "?page=1&size=10&type=" + payload.body.type
    );
    if (res?.statusCode == 200) {
      yield put(actions.getCustBookingAction.success(res.data));
      // yield put(actions.getInstructorClassAction.request());
      yield delay(1000);
    } else {
      yield put(actions.getCustBookingAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getCustBookingAction.error(false));
  }
}

export function* getInstBookingCall(payload) {
  try {
    yield put(actions.getInsBookingAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      payload.body,
      url.INSTRUCTOR_BOOKING +
        "?page=1&size=10&type=" +
        payload.body.type +
        "&date=" +
        payload.body.date
    );
    if (res?.statusCode == 200) {
      yield put(actions.getInsBookingAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getInsBookingAction.error(false));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getInsBookingAction.error(false));
  }
}

export function* custCancelBookingCall(payload) {
  try {
    yield put(actions.custCancelBookingAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.putApi,
      {},
      url.CUSTOMER_BOOKING + "/" + payload.params
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.custCancelBookingAction.success(res.data));
      yield put(actions.getCustBookingAction.request(payload.body));
      yield put(actions.modalVisible.modalClose());
      yield delay(1000);
    } else {
      yield put(actions.custCancelBookingAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.custCancelBookingAction.error(false));
  }
}

export function* addRatingCall(payload) {
  try {
    yield put(actions.addRatingAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.payload, url.ADD_RATING);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.addRatingAction.success(res.data));
      yield put(actions.getCustBookingAction.request(payload.body));
      yield delay(1000);
    } else {
      yield put(actions.addRatingAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.addRatingAction.error(false));
  }
}

export function* createReportCall(payload) {
  try {
    yield put(actions.createReportAction.loading(true));
    // yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.CREATE_REPORT);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.createReportAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.createReportAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.addRatingAction.error(false));
  }
}

export function* discountCall(payload) {
  try {
    yield put(actions.discountAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, null, url.DISCOUNT);
    if (res?.statusCode == 200) {
      yield put(actions.discountAction.success(res.data));
      yield put(actions.discountAction.loading(false));

      yield delay(1000);
    } else {
      yield put(actions.discountAction.error(false));
      yield put(actions.discountAction.loading(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.discountAction.error(false));
    yield put(actions.discountAction.loading(false));
  }
}

function* BookingSaga() {
  yield all([takeEvery(Constants.CREATE_BOOKING_REQUEST, createBookingCall)]);
  yield all([
    takeEvery(Constants.GET_CUST_BOOKING_REQUEST, getCustBookingCall),
  ]);
  yield all([
    takeEvery(Constants.GET_INST_BOOKING_REQUEST, getInstBookingCall),
  ]);
  yield all([
    takeEvery(Constants.CUST_CANCEL_BOOKING_REQUEST, custCancelBookingCall),
  ]);
  yield all([takeEvery(Constants.ADD_RATING_REQUEST, addRatingCall)]);
  yield all([takeEvery(Constants.CREATE_REPORT_REQUEST, createReportCall)]);
  yield all([takeEvery(Constants.GET_DISCOUNT_REQUEST, discountCall)]);
}

export default BookingSaga;
