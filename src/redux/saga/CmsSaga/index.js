import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";
import { setCookie } from "cookies-next";
import { Modules } from "../../../constants/modules";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* aboutCall(payload) {
  try {
    yield put(actions.aboutAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, null, url.About_CMS);

    if (res?.statusCode == 200) {
      yield put(actions.aboutAction.success(res.data));
      //   toast.success("welcome");
      yield delay(1000);
    } else {
      yield put(actions.aboutAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.aboutAction.error(false));
  }
}

function* CmsSaga() {
  yield all([takeEvery(Constants.GET_ABOUT_REQUEST, aboutCall)]);
}

export default CmsSaga;
