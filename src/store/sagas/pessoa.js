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

  import { types } from "../ducks/pessoa"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/pessoa';
  import * as apiAddress from '../services/address';
  import * as apiPhone from '../services/phone';

  function* searchPessoa ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_PESSOA, 
        payload: { searchTerm : payload.searchTerm, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchPessoa({payload}) {
    try{

      if(!payload.notReload)
        yield put({ type: types.PESSOA_LOADING });

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || ""
      };
      
      let response = yield call(api.fetchPessoa, params);

      const { current_page, last_page, data, total, per_page } = response.data;

      yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
      yield put({ type: types.LOAD_PESSOA, payload: data });

    }
    catch(error){
      //console.log({error})
      if(error.response && error.response.status == 401){
        yield put({ type: typesError.ERROR, payload: [] })
      }
      else { //(error.message){
        yield put({ type: types.PESSOA_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOAD_PESSOA, payload: null }); 
    }
  }


  function* fetchPessoaById({ payload }) {
    try{
      yield put({ type: types.PESSOA_LOADING });
      
      let response = yield call(api.fetchPessoaById, payload);

      yield put({ type: types.LOAD_PESSOA, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_PESSOA, payload: null }); 
    }
  }
 
  function* createPessoa ({ payload }) {
    try {
      yield put({ type: types.PESSOA_LOADING });
      let response = yield call(api.createPessoa, payload);
      yield put({ type: types.LOAD_PESSOA, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updatePessoa({payload}){
    try {
      yield put({ type: types.PESSOA_LOADING });
      let response = yield call(api.updatePessoa, payload.id, payload.values);
      yield put({ type: types.LOAD_PESSOA, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* updateAddress({payload}) {
    try {
      yield put({ type: types.PESSOA_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.pessoa.data.id);
      }

      let response = yield call(apiAddress.updateAddress, payload);
      let pessoa = yield select (state => state.pessoa.data);
      pessoa.address = response.data;

      yield put({ type: types.LOAD_PESSOA, payload: pessoa});
    
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* updatePhone({payload}) {
    try {
      yield put({ type: types.PESSOA_LOADING });
      if(!payload.pessoa_id){
        payload.pessoa_id = yield select (state => state.pessoa.data.id);
      }

      let response = yield call(apiPhone.updatePhone, payload);
      let pessoa = yield select (state => state.pessoa.data);
      pessoa.phones = response.data;

      yield put({ type: types.LOAD_PESSOA, payload: pessoa});
    
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  export default function* pessoaSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_PESSOA, fetchPessoa),
      takeLatest(types.ASYNC_LOAD_PESSOA_ID, fetchPessoaById),
      takeLatest(types.ASYNC_CREATE_PESSOA, createPessoa),
      takeLatest(types.ASYNC_UṔDATE_PESSOA, updatePessoa),
      takeLatest(types.ASYNC_UPDATE_PESSOA_ADDRESS, updateAddress),
      takeLatest(types.ASYNC_UPDATE_PESSOA_PHONE, updatePhone),
      takeLatest(types.ASYNC_SEARCH_PESSOA, searchPessoa)
    ]);
  }
  