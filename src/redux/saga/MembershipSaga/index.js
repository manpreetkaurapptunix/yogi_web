import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

/* Post API */
export function* membershipAddCall(payload) {
  try {
    yield put(actions.membershipAction.loading(true));
    // yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.ADD_MEMBERSHIP);

    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.membershipAction.success(res.data));
      yield put(actions.membershipGetAction.request());
    } else {
      yield put(actions.membershipAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.membershipAction.error(false));
  }
}

/* GET API */
export function* membershipGetCall(payload) {
  try {
    yield put(actions.membershipGetAction.loading(true));
    const res = yield call(apis.getApi, {}, url.ADD_MEMBERSHIP);

    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.membershipGetAction.success(res?.data));

      yield put(actions.membershipGetAction.loading(false));
    } else {
      yield put(actions.membershipGetAction.loading(false));
      yield put(actions.membershipGetAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.membershipGetAction.loading(false));
    yield put(actions.membershipGetAction.error(false));
  }
}

/* DELETE API */
export function* deleteMembership({ data }) {
  try {
    yield put(actions.membershipDeleteAction.loading(true));
    const res = yield call(apis.delete_form, url.ADD_MEMBERSHIP + "/" + data);

    if (res?.statusCode == 200) {
      yield put(actions.membershipDeleteAction.success(res.data));
      yield put(actions.modalVisible.modalClose());
      yield put(actions.membershipGetAction.request());
      toast.success(res.message);
      yield delay(1000);
    } else {
      yield put(actions.membershipDeleteAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.membershipDeleteAction.error(false));
  }
}

/* GET API BY ID */
export function* singleMembershipGetCall(data) {
  try {
    yield put(actions.membershipGetIDAction.loading(true));
    const res = yield call(
      apis.getApi,
      {},
      url.ADD_MEMBERSHIP + "/" + data.data
    );
    if (res?.statusCode == 200) {
      toast.success(res.success);
      yield put(actions.membershipGetIDAction.success(res?.data));
      yield put(actions.membershipGetIDAction.loading(false));
    } else {
      yield put(actions.membershipGetIDAction.loading(false));
      yield put(actions.membershipGetIDAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.membershipGetIDAction.loading(false));
    yield put(actions.membershipGetIDAction.error(false));
  }
}

/* Update API */
export function* updateMember(data) {
  try {
    yield put(actions.membershipUpdateAction.loading(true));
    const res = yield call(
      apis.putApi,
      data.data,
      url.ADD_MEMBERSHIP + "/" + data.id
    );
    if (res?.statusCode == 200) {
      toast.success("Updated Successfully");
      yield put(actions.membershipUpdateAction.success(false));
      yield put(actions.membershipGetAction.request());
      yield delay(1000);
    } else {
      yield put(actions.membershipUpdateAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.membershipUpdateAction.error(false));
  }
}

/* GET instructor subscription API */
export function* getInstSubCall(payload) {
  try {
    yield put(actions.getInstSubscriptionAction.loading(true));
    const res = yield call(
      apis.getApi,
      {},
      url.INST_SUBSCRIPTION + "?instructorId=" + payload?.params?.id
    );

    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getInstSubscriptionAction.success(res?.data));
    } else {
      yield put(actions.getInstSubscriptionAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getInstSubscriptionAction.error(false));
  }
}

// BUY MEMBERSHIPpppp
export function* buyMembershipCall(payload) {
  try {
    yield put(actions.buySubscriptionAction.loading(true));
    // yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.USER_SUBSCRIPTION);

    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.buySubscriptionAction.success(res.data));
    } else {
      yield put(actions.buySubscriptionAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.buySubscriptionAction.error(false));
  }
}

/* GET user membership API */
export function* getUserMemberCall(payload) {
  try {
    yield put(actions.getUserMemberAction.loading(true));
    const res = yield call(apis.getApi, {}, url.USER_SUBSCRIPTION);

    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.getUserMemberAction.success(res?.data));
    } else {
      yield put(actions.getUserMemberAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getUserMemberAction.error(false));
  }
}

function* MembershipSaga() {
  yield all([takeEvery(Constants.ADD_MEMBER_REQUEST, membershipAddCall)]);
  yield all([takeEvery(Constants.GET_MEMBER_REQUEST, membershipGetCall)]);
  yield all([takeEvery(Constants.DELETE_MEMBER_REQUEST, deleteMembership)]);
  yield all([takeEvery(Constants.UPDATE_MEMBER_REQUEST, updateMember)]);
  yield all([
    takeEvery(Constants.GET_SINGLE_MEMBER_REQUEST, singleMembershipGetCall),
  ]);
  yield all([
    takeEvery(Constants.GET_INST_SUBSCRIPTION_REQUEST, getInstSubCall),
  ]);
  yield all([takeEvery(Constants.BUY_SUBSCRIPTION_REQUEST, buyMembershipCall)]);
  yield all([takeEvery(Constants.GET_USER_MEMBER_REQUEST, getUserMemberCall)]);
}

export default MembershipSaga;
