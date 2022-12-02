import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* faqCall(payload) {
  try {
    yield put(actions.faqAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, null, url.FAQ_CMS);

    if (res?.statusCode == 200) {
      yield put(actions.faqAction.success(res.data));
      yield put(actions.faqAction.loading(false));
      //   toast.success("welcome");
      yield delay(1000);
    } else {
      yield put(actions.faqAction.error(false));
      yield put(actions.faqAction.loading(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.faqAction.error(false));
    yield put(actions.faqAction.loading(false));
  }
}

function* FaqSaga() {
  yield all([takeEvery(Constants.GET_FAQ_REQUEST, faqCall)]);
}

export default FaqSaga;
