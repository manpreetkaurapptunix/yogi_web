import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* userDashboardCall(payload) {
  try {
    yield put(actions.getUserDashAction.loading(true));
    yield delay(1000);

    let res = {};
    {
      payload?.body?.arr
        ? (res = yield call(
            apis.getHomeApi,
            null,
            url.USER_DASHBOARD +
              "?categoryIds=" +
              payload?.body?.arr +
              "&type=" +
              payload?.body?.sortFilter +
              "&amount=" +
              payload?.body?.priceFilter +
              "&startTime=" +
              payload?.body?.startTime +
              "&endTime=" +
              payload?.body?.endTime +
              "&guestMode=" +
              payload?.params?.guestMode +
              "&schoolName=" +
              payload?.body?.schoolName +
              "&className=" +
              payload?.body?.className +
              (payload?.body?.longitude
                ? "&longitude=" +
                  payload?.body?.longitude +
                  "&latitude=" +
                  payload?.body?.latitude
                : "")
          ))
        : (res = yield call(
            apis.getHomeApi,
            null,
            url.USER_DASHBOARD + "?guestMode=" + payload?.params?.guestMode
          ));
    }

    if (res?.statusCode == 200) {
      yield put(actions.getUserDashAction.success(res.data));
      yield put(actions.modalVisible.modalClose());
      //   toast.success("welcome");
      yield delay(1000);
    } else {
      yield put(actions.getUserDashAction.error(false));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getUserDashAction.error(false));
  }
}

function* HomeSaga() {
  yield all([
    takeEvery(Constants.GET_USER_DASHBOARD_REQUEST, userDashboardCall),
  ]);
}

export default HomeSaga;
