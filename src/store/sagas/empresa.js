import {
    all,
    //take,
    takeLatest,
    put,
    call,
    //fork,
    //delay,
    select
  } from "redux-saga/effects";

  import { types } from "../ducks/empresa"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/empresa';
  import * as apiAddress from '../services/address';
  import * as apiPhone from '../services/phone';

  

  function* fetchEmpresa({payload}) {
    try{

      yield put({ type: types.EMPRESA_LOADING });

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || ""
      };
      
      let response = yield call(api.fetchEmpresa, params);

      const { current_page, last_page, data, total, per_page } = response.data;

      yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
      yield put({ type: types.LOAD_EMPRESA, payload: data });

    }
    catch(error){
      //console.log({error})
      if(error.response && error.response.status == 401){
        yield put({ type: typesError.ERROR, payload: [] })
      }
      else { //(error.message){
        yield put({ type: types.EMPRESA_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOAD_EMPRESA, payload: null }); 
    }
  }


  function* fetchEmpresaById({ payload }) {
    try{
      yield put({ type: types.EMPRESA_LOADING });
      
      let response = yield call(api.fetchEmpresaById, payload);

      yield put({ type: types.LOAD_EMPRESA, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_EMPRESA, payload: null }); 
    }
  }
 
  function* createEmpresa ({ payload }) {
    try {
      yield put({ type: types.EMPRESA_LOADING });
      let response = yield call(api.createEmpresa, payload);
      yield put({ type: types.LOAD_EMPRESA, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateEmpresa({payload}){
    try {
      yield put({ type: types.EMPRESA_LOADING });
      let response = yield call(api.updateEmpresa, payload.id, payload.values);
      yield put({ type: types.LOAD_EMPRESA, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* updateAddress({payload}) {
    try {
      yield put({ type: types.EMPRESA_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.empresa.data.id);
      }

      let response = yield call(apiAddress.updateAddress, payload);
      let empresa = yield select (state => state.empresa.data);
      empresa.address = response.data;

      yield put({ type: types.LOAD_EMPRESA, payload: empresa});
    
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* updatePhone({payload}) {
    try {
      yield put({ type: types.EMPRESA_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.empresa.data.id);
      }

      let response = yield call(apiPhone.updatePhone, payload);
      let empresa = yield select (state => state.empresa.data);
      empresa.phones = response.data;

      yield put({ type: types.LOAD_EMPRESA, payload: empresa});
    
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  export default function* empresaSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_EMPRESA, fetchEmpresa),
      takeLatest(types.ASYNC_LOAD_EMPRESA_ID, fetchEmpresaById),
      takeLatest(types.ASYNC_CREATE_EMPRESA, createEmpresa),
      takeLatest(types.ASYNC_UPDATE_EMPRESA, updateEmpresa),
      takeLatest(types.ASYNC_UPDATE_EMPRESA_ADDRESS, updateAddress),
      takeLatest(types.ASYNC_UPDATE_EMPRESA_PHONE, updatePhone)
    ]);
  }
  