import {
    all,
    takeLatest,
    put,
    call,
    select
  } from "redux-saga/effects";

  import { types } from "../ducks/funcionario"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/funcionario';
  import * as apiAddress from '../services/address';
  import * as apiPhone from '../services/phone';

  

  function* fetchFuncionario({payload}) {
    try{

      yield put({ type: types.FUNCIONARIO_LOADING });

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || ""
      };
      
      let response = yield call(api.fetchFuncionario, params);

      const { current_page, last_page, data, total, per_page } = response.data;

      yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
      yield put({ type: types.LOAD_FUNCIONARIO, payload: data });

    }
    catch(error){
      //console.log({error})
      if(error.response && error.response.status == 401){
        yield put({ type: typesError.ERROR, payload: [] })
      }
      else { //(error.message){
        yield put({ type: types.FUNCIONARIO_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOAD_FUNCIONARIO, payload: null }); 
    }
  }


  function* fetchFuncionarioById({ payload }) {
    try{
      yield put({ type: types.FUNCIONARIO_LOADING });
      
      let response = yield call(api.fetchFuncionarioById, payload);

      yield put({ type: types.LOAD_FUNCIONARIO, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_FUNCIONARIO, payload: null }); 
    }
  }
 
  function* createFuncionario ({ payload }) {
    try {
      yield put({ type: types.FUNCIONARIO_LOADING });
      let response = yield call(api.createFuncionario, payload);
      yield put({ type: types.LOAD_FUNCIONARIO, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateFuncionario({payload}){
    try {
      yield put({ type: types.FUNCIONARIO_LOADING });
      let response = yield call(api.updateFuncionario, payload.id, payload.values);
      yield put({ type: types.LOAD_FUNCIONARIO, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* fetchPessoa( ){
    try {
      let response = yield call(api.fetchPessoa);
      yield put({ type: types.LOAD_LIST_PESSOA, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }

  /*
  function* updateAddress({payload}) {
    try {
      yield put({ type: types.FUNCIONARIO_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.pessoa.data.id);
      }

      let response = yield call(apiAddress.updateAddress, payload);
      let pessoa = yield select (state => state.pessoa.data);
      pessoa.address = response.data;

      yield put({ type: types.LOAD_FUNCIONARIO, payload: pessoa});
    
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* updatePhone({payload}) {
    try {
      yield put({ type: types.FUNCIONARIO_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.pessoa.data.id);
      }

      console.log(payload);

      let response = yield call(apiPhone.updatePhone, payload);
      let pessoa = yield select (state => state.pessoa.data);
      pessoa.phones = response.data;

      yield put({ type: types.LOAD_FUNCIONARIO, payload: pessoa});
    
    } 
    catch (error) {
      console.log(error);
    }
  } */
  
  export default function* funcionarioSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_FUNCIONARIO, fetchFuncionario),
      takeLatest(types.ASYNC_LOAD_FUNCIONARIO_ID, fetchFuncionarioById),
      takeLatest(types.ASYNC_CREATE_FUNCIONARIO, createFuncionario),
      takeLatest(types.ASYNC_UṔDATE_FUNCIONARIO, updateFuncionario),
      takeLatest(types.ASYNC_LOAD_LIST_PESSOA, fetchPessoa),
      //takeLatest(types.ASYNC_UPDATE_FUNCIONARIO_ADDRESS, updateAddress),
      //takeLatest(types.ASYNC_UPDATE_FUNCIONARIO_PHONE, updatePhone)
    ]);
  }
  