import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getChatsList({ params }) {
  console.log({ params });
  try {
    yield put(actions.getChatList.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      params,
      url.CHAT_LIST + "?search=" + params
    );
    if (res?.statusCode == 200) {
      yield put(actions.getChatList.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getChatList.error(res.message));
    }
  } catch (error) {
    yield put(actions.getChatList.error(error));
  }
}

export function* getChatHistory({ params }) {
  try {
    yield put(actions.getChatHistory.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      params,
      url.CHAT_HISTORY + "?userId=" + params.id
    );
    if (res?.statusCode == 200) {
      yield put(actions.getChatHistory.success(res.data));
      yield put(actions.getChatList.request(""));
      yield delay(1000);
    } else {
      yield put(actions.getChatHistory.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getChatHistory.error(false));
  }
}

function* ChatSaga() {
  yield all([takeEvery(Constants.GET_CHAT_LIST_REQUEST, getChatsList)]);
  yield all([takeEvery(Constants.GET_CHAT_HISTORY_REQUEST, getChatHistory)]);
}

export default ChatSaga;
