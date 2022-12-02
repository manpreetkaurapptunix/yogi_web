import { takeEvery, put, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import * as apis from "../../services";
import * as url from "../../../constants/urls";
import { Constants } from "../../constants";

import { deleteCookie, setCookie } from "cookies-next";
import { Modules } from "../../../constants/modules";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* loginCall(payload) {
  try {
    yield put(actions.loginAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.LOGIN);

    if (res?.statusCode == 200) {
      setCookie("type", res.data.role);
      setCookie("token", res.data.token);
      setCookie("userData", JSON.stringify(res.data));
      yield put(actions.tempData.updateTempData({ role: res.data.role }));
      yield put(actions.loginAction.success(false, res.data));
      yield put(
        actions.tempData.updateTempData({
          profileComp: res.data.document,
        })
      );
      yield put(actions.resetAuth.authorise());
      yield put(actions.modalVisible.modalClose());
      yield put(actions.roleAction.success(res.data.role));
      yield delay(1000);
    } else {
      yield put(actions.loginAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.loginAction.error(false));
  }
}

export function* registerCall(payload) {
  try {
    yield put(actions.registerAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.REGISTER);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      setCookie("userData", JSON.stringify(res.data));
      // setCookie("type", res.data.role);
      yield put(actions.registerAction.success(res.data));
      yield put(actions.modalVisible.modalClose());
      yield put(actions.modalVisible.modalOpen(Modules.VERIFY));
      yield put(
        actions.tempData.updateTempData({
          profileComp: res.data.document,
        })
      );
      yield delay(1000);
    } else {
      yield put(actions.registerAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.registerAction.error(false));
  }
}

export function* verifyOtpCall(payload) {
  try {
    yield put(actions.verifyOtpAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.VERIFY_OTP);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.verifyOtpAction.success(false, res.data));

      yield put(actions.tempData.updateTempData({ signUp: null }));

      if (payload.route == "signup") {
        setCookie("type", res.data.role);
        setCookie("token", res.data.token);
        setCookie("userData", JSON.stringify(res.data));
        if (res.data.role == "instructor") {
          yield put(actions.getProfileAction.request());
        }

        yield put(actions.modalVisible.modalClose());
        yield put(actions.resetAuth.authorise());
      } else {
        yield put(actions.tempData.updateTempData({ token: res.data?.token }));
      }

      yield delay(1000);
    } else {
      yield put(actions.verifyOtpAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.verifyOtpAction.error(false));
  }
}

export function* forgotPasswordCall(payload) {
  try {
    yield put(actions.forgotPasswordAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.FORGOT_PASSWORD);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.forgotPasswordAction.success(res?.data));
      // yield put(actions.modalVisible.modalOpen(Modules.VERIFY));
      yield delay(1000);
    } else {
      yield put(actions.forgotPasswordAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.forgotPasswordAction.error(false));
  }
}

export function* resendOtpCall(payload) {
  try {
    yield put(actions.resendOtpAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.FORGOT_PASSWORD);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.resendOtpAction.success(false));
      yield delay(1000);
    } else {
      yield put(actions.resendOtpAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.resendOtpAction.error(false));
  }
}

export function* resetPasswordCall(payload) {
  try {
    yield put(actions.resetPasswordAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.postApi,
      payload.body,
      url.RESET_PASSWORD,
      payload.token
    );
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.resetPasswordAction.success(false));
      yield put(actions.modalVisible.modalClose());
      yield put(
        actions.tempData.updateTempData({ token: null, forgotData: null })
      );
      yield delay(1000);
    } else {
      yield put(actions.resetPasswordAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.resetPasswordAction.error(false));
  }
}

export function* imageUploadCall(payload) {
  try {
    yield put(actions.imageUploadAction.loading(true));
    yield delay(1000);
    const res = yield call(
      apis.multipartFormApi,
      payload.body,
      url.FILE_UPLOAD,
      ""
    );
    if (res?.statusCode == 200) {
      yield put(actions.imageUploadAction.success(res.data));
      yield put(actions.tempData.updateTempData({ uploadImage: res.data }));
      yield delay(1000);
    } else {
      yield put(actions.imageUploadAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.imageUploadAction.error(false));
  }
}

export function* getProfileCall(payload) {
  try {
    yield put(actions.getProfileAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.getApi, null, url.GET_PROFILE);
    if (res?.statusCode == 200) {
      setCookie("userData", JSON.stringify(res.data));
      // toast.success(res.message);
      yield put(actions.getProfileAction.success(res.data));
      yield put(
        actions.tempData.updateTempData({
          profileComp: res.data.document,
        })
      );
      yield delay(1000);
    } else {
      yield put(actions.getProfileAction.error(res.message));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.getProfileAction.error(error));
  }
}

export function* updateProfileCall(payload) {
  try {
    yield put(actions.updatProfileAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.putApi, payload.body, url.UPDATE_PROFILE);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      setCookie("userData", JSON.stringify(res.data));
      yield put(actions.updatProfileAction.success(res.data));
      yield put(actions.getProfileAction.request());

      yield delay(1000);
    } else {
      yield put(actions.updatProfileAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.updatProfileAction.error(false));
  }
}

export function* changePasswordCall(payload) {
  try {
    yield put(actions.changePasswordAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.CHANGE_PASSWORD);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.changePasswordAction.success(res.data));
      // yield put(actions.resetAuth.authorise());
      yield delay(1000);
    } else {
      yield put(actions.changePasswordAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.changePasswordAction.error(false));
  }
}

export function* addBankDetailCall(payload) {
  try {
    yield put(actions.addBankDetailAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.ADD_BANK_DETAIL);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      yield put(actions.addBankDetailAction.success(res.data));

      yield delay(1000);
    } else {
      yield put(actions.addBankDetailAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.addBankDetailAction.error(false));
  }
}

export function* logoutCall() {
  try {
    yield put(actions.logoutAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, {}, url.LOGOUT);
    if (res?.statusCode == 200) {
      // toast.success(res.message);
      yield put(actions.logoutAction.success(false));
      yield put(actions.resetAuth.unAuthorise());
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");
      dispatch(tempData.updateTempData({ role: "user" }));

      yield delay(1000);
    } else {
      yield put(actions.logoutAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.logoutAction.error(false));
  }
}

export function* switchUserCall(payload) {
  console.log({ payload });
  try {
    yield put(actions.switchUserAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.putApi, payload.body, url.SWITCH);
    if (res?.statusCode == 200) {
      toast.success(res.message);
      setCookie("token", res.data.token);
      setCookie("type", res.data.role);
      setCookie("userData", JSON.stringify(res.data));
      yield put(actions.switchUserAction.success(res.data));
      yield put(actions.getProfileAction.request());
      yield put(actions.resetAuth.authorise());
      yield put(actions.tempData.updateTempData({ role: res.data.role }));
      yield delay(1000);
    } else {
      yield put(actions.switchUserAction.error(false));
      // toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.switchUserAction.error(false));
  }
}

export function* socialLoginCall(payload) {
  try {
    yield put(actions.sociallLoginAction.loading(true));
    yield delay(1000);
    const res = yield call(apis.postApi, payload.body, url.SOCIAL_LOGIN);

    if (res?.statusCode == 200) {
      setCookie("type", res.data.role);
      setCookie("token", res.data.token);
      setCookie("userData", JSON.stringify(res.data));
      yield put(actions.sociallLoginAction.success(false, res.data));

      yield put(actions.resetAuth.authorise());
      yield put(actions.modalVisible.modalClose());
      yield put(actions.roleAction.success(res.data.role));
      yield delay(1000);
    } else {
      yield put(actions.sociallLoginAction.error(false));
      toast.error(res.message);
    }
  } catch (error) {
    yield put(actions.sociallLoginAction.error(false));
  }
}

function* AuthSaga() {
  yield all([takeEvery(Constants.LOGIN_REQUEST, loginCall)]);
  yield all([takeEvery(Constants.REGISTER_REQUEST, registerCall)]);
  yield all([takeEvery(Constants.VERIFY_OTP_REQUEST, verifyOtpCall)]);
  yield all([takeEvery(Constants.FORGOT_PASSWORD_REQUEST, forgotPasswordCall)]);
  yield all([takeEvery(Constants.RESEND_OTP_REQUEST, resendOtpCall)]);
  yield all([takeEvery(Constants.RESET_PASSWORD_REQUEST, resetPasswordCall)]);
  yield all([takeEvery(Constants.IMAGE_UPLOAD_REQUEST, imageUploadCall)]);
  yield all([takeEvery(Constants.GET_PROFILE_REQUEST, getProfileCall)]);
  yield all([takeEvery(Constants.UPDATE_PROFILE_REQUEST, updateProfileCall)]);
  yield all([takeEvery(Constants.CHANGE_PASSWORD_REQUEST, changePasswordCall)]);
  yield all([takeEvery(Constants.ADD_BANK_REQUEST, addBankDetailCall)]);
  yield all([takeEvery(Constants.LOGOUT_REQUEST, logoutCall)]);
  yield all([takeEvery(Constants.SWITCH_USER_REQUEST, switchUserCall)]);
  yield all([takeEvery(Constants.SOCIAL_LOGIN_REQUEST, socialLoginCall)]);
}

export default AuthSaga;
