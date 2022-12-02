import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";
// import { setCookie } from "cookies-next";
// import { Modules } from "../../../constants/modules";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* instDashCall(payload) {
  try {
    yield put(actions.insDashAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      null,
      url.INS_DASHBOARD + `?type=${payload.body}`
    );
    if (res?.statusCode == 200) {
      yield put(actions.insDashAction.success(res.data));
      let arr = [];
      arr = res.data?.earning?.map((item) => item?.name);
      let val = [];
      val = res.data?.earning?.map((item) => item?.earning);

      let graphData = {
        arr,
        val,
      };
      yield put(actions.tempData.updateTempData({ graphData: graphData }));
      //   yield delay(1000);
    } else {
      yield put(actions.insDashAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.insDashAction.error(false));
  }
}

function* instDashboard() {
  yield all([takeEvery(Constants.GET_INT_DASHBOARD_REQUEST, instDashCall)]);
}

export default instDashboard;
