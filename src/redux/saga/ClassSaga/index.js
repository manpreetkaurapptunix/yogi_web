import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";
import { setCookie } from "cookies-next";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* getClassCall({ params }) {
  try {
    yield put(actions.classAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      params,
      url.GET_CLASS_API + "?type=ALL"
    );
    if (res?.statusCode == 200) {
      yield put(actions.classAction.success(false, res.data));
      yield delay(1000);
    } else {
      yield put(actions.classAction.error(false));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.classAction.error(false));
  }
}
export function* singleClassCall({ params }) {
  try {
    yield put(actions.singleClassAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      params,
      url.GET_CLASS_API + "/" + params.id
    );
    if (res?.statusCode == 200) {
      yield put(actions.singleClassAction.success(false, res.data));
      yield delay(1000);
    } else {
      yield put(actions.singleClassAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.singleClassAction.error(false));
  }
}

export function* createClassCall(payload) {
  try {
    yield put(actions.createClassAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.INSTRUCTOR_CLASS);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.createClassAction.success(res.data));
      yield put(actions.getInstructorClassAction.request());
      yield delay(1000);
    } else {
      yield put(actions.createClassAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.createClassAction.error(false));
  }
}

export function* getCategoryCall({ params }) {
  try {
    yield put(actions.getCategoryAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, params, url.GET_CATEGORY);
    if (res?.statusCode == 200) {
      yield put(actions.getCategoryAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getCategoryAction.error(false));
    }
  } catch (error) {
    yield put(actions.getCategoryAction.error(false));
  }
}

export function* getInstructorClassCall({ params }) {
  try {
    yield put(actions.getInstructorClassAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, "", url.INSTRUCTOR_CLASS);
    if (res?.statusCode == 200) {
      yield put(actions.getInstructorClassAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getInstructorClassAction.error(false));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getInstructorClassAction.error(false));
  }
}

export function* deleteInstructorClassCall({ params }) {
  try {
    yield put(actions.deleteInstructorClassAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.delete_form,
      url.INSTRUCTOR_CLASS + "/" + params
    );
    if (res?.statusCode == 200) {
      yield put(actions.deleteInstructorClassAction.success(res.data));
      yield put(actions.modalVisible.modalClose());
      yield put(actions.getInstructorClassAction.request());

      toast.success(res.message);
      yield delay(1000);
    } else {
      yield put(actions.deleteInstructorClassAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.deleteInstructorClassAction.error(false));
  }
}

export function* instClassByIDCall({ params }) {
  try {
    yield put(actions.instClassByIdAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      "",
      url.INSTRUCTOR_CLASS + "/" + params
    );
    if (res?.statusCode == 200) {
      yield put(actions.instClassByIdAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.instClassByIdAction.error(res.message));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.instClassByIdAction.error(error));
  }
}

export function* updateInsClassCall(params) {
  try {
    yield put(actions.updateInsClassAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.putApi,
      params.params.body,
      url.INSTRUCTOR_CLASS + "/" + params.params.id
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.updateInsClassAction.success(false));
      yield put(actions.getInstructorClassAction.request());
      yield delay(1000);
    } else {
      yield put(actions.updateInsClassAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.updateInsClassAction.error(false));
  }
}

export function* getClassByCatCall({ params }) {
  try {
    yield put(actions.getClassByCatAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.getApi,
      "",
      url.CATEGORY_CLASS + "/" + params?.id
    );
    if (res?.statusCode == 200) {
      yield put(actions.getClassByCatAction.success(res.data));
      yield delay(1000);
    } else {
      yield put(actions.getClassByCatAction.error(res.message));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getClassByCatAction.error(error));
  }
}

function* ClassSaga() {
  yield all([takeEvery(Constants.GET_CLASS_REQUEST, getClassCall)]);
  yield all([takeEvery(Constants.SINGLE_CLASS_REQUEST, singleClassCall)]);
  yield all([takeEvery(Constants.CREATE_CLASS_REQUEST, createClassCall)]);
  yield all([takeEvery(Constants.GET_CATEGORY_REQUEST, getCategoryCall)]);
  yield all([
    takeEvery(Constants.GET_INSTRUCTOR_CLASS_REQUEST, getInstructorClassCall),
  ]);
  yield all([
    takeEvery(
      Constants.DELETE_INSTRUCTOR_CLASS_REQUEST,
      deleteInstructorClassCall
    ),
  ]);
  yield all([
    takeEvery(Constants.INSTRUCTOR_CLASS_BYID_REQUEST, instClassByIDCall),
  ]);
  yield all([
    takeEvery(Constants.UPDATE_INS_CLASS_REQUEST, updateInsClassCall),
  ]);
  yield all([takeEvery(Constants.GET_CLASS_BYCAT_REQUEST, getClassByCatCall)]);
}

export default ClassSaga;
