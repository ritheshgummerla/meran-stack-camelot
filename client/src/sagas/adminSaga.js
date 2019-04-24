import { takeEvery, call, put, all } from "redux-saga/effects";
import constants from "../constaints/constants";
import Api from "../api";

function* findEmail() {
    const response = yield call(Api.findEmail);
    yield put({ type: constants.FETCH_EMAIL_SUCCESS, payload:response.data });
  }

  function* onSubmit(model) {
    const response = yield Api.sendData(model.name) 
    yield put({ type: constants.ON_NAME_SUBMIT_SUCCESS, payload:response.data });
  }

export default function* rootSaga() {
    yield all([
      takeEvery(constants.FETCH_EMAIL_REQUEST, findEmail),
      takeEvery(constants.ON_NAME_SUBMIT, onSubmit),
  
    ]);
  }
  