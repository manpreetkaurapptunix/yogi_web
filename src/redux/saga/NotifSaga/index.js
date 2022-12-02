import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* notifCall(payload) {
  try {
    yield put(actions.notificationListAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, null, url.GET_NOTIF);

    if (res?.statusCode == 200) {
      yield put(actions.notificationListAction.success(res.data));

      //   toast.success("welcome");
      yield delay(1000);
    } else {
      yield put(actions.notificationListAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.notificationListAction.error(false));
  }
}

function* NotifSaga() {
  yield all([takeEvery(Constants.NOTIFICATION_LIST_REQUEST, notifCall)]);
}

export default NotifSaga;
