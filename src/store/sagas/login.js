import {
    all,
    //take,
    takeLatest,
    put,
    call,
    //fork,
    delay,
    //select
  } from "redux-saga/effects";

  import { types } from "../ducks/login"; 
  import { types as typesError } from "../ducks/error";
  import * as api from '../services/login';

  

  function* fetchLogin({ payload }) {
    try{

      yield put({ type: types.LOGIN_LOADING });

      let errors = validateEmpty(payload);
      if(errors){
        throw new Error(errors);
      }

      let response = yield call(api.login, payload);

      yield delay(2000)

      yield put({ type: types.LOGIN, payload: response.data });
      yield call(api.setAuthStorage, response.data);

    }
    catch(error){
      //console.log({error})
      if(error.response && error.response.status == 401){
        yield put({ type: typesError.ERROR, payload: [{ message: "Usuário não autorizado."}] })
      }
      else { //(error.message){
        yield put({ type: types.LOGIN_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOGIN, payload: null }); 
    }
  }

  function* fetchLoadAuth() {
    try {
      const data = yield call(api.getAuthStorage);
      yield put({ type: types.LOGIN, payload: data });
  
    } catch (err) {
      yield put({ type: types.LOGIN, payload: null });
    }
  }

  function* fetchLogout() {
    yield call(api.clearStorageAuth);  
    yield put({ type: types.LOGIN_ERROR });
  }
  

  const validateEmpty = (obj) => {

    let errors = [];

    if(obj.email.trim() === ''){
      errors.push({ field: "email", message:"o campo E-mail é obrigatório"});
    }
    
    if(obj.password.trim() === ''){
      errors.push({field: "password", message: "O campo senha é obrigatório"});
    }

    if(errors.length > 0){
      return JSON.stringify(errors);
    }

    return false;
    
}
 
  
  export default function* loginSaga() {
    yield call(fetchLoadAuth);  
    yield all([
      takeLatest(types.ASYNC_LOGIN, fetchLogin),
      takeLatest(types.ASYNC_LOGOUT, fetchLogout),
    ]);
  }
  