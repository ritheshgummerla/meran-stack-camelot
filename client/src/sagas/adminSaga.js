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

  function* ifileRequest(model) {
    const response = yield Api.ifileApiRequest(model.data) 
    yield put({ type: constants.ON_REQUEST_DATA_SUCCESS, payload:response.data });
  }

  function* onValidate(model) {
    
    const data=[]
    model.id.filter(i=>{
        data.push({id:i})
    })
    const response = yield Api.onValidate(data) 
    yield put({ type: constants.ON_VALID_SUCCESS, payload:response.data });
  }


export default function* rootSaga() {
    yield all([
      takeEvery(constants.FETCH_EMAIL_REQUEST, findEmail),
      takeEvery(constants.ON_NAME_SUBMIT, onSubmit),
      takeEvery(constants.ON_VALIDATE, onValidate),
      takeEvery(constants.ON_REQUEST_DATA, ifileRequest)
  
    ]);
  }
  