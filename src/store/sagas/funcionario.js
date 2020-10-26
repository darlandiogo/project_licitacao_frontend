import {
    all,
    takeLatest,
    put,
    call,
  } from "redux-saga/effects";

  import { types } from "../ducks/funcionario"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/funcionario';


  function* searchFuncionario ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_FUNCIONARIO, 
        payload: { searchTerm : payload.searchTerm, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchFuncionario({payload}) {
    try{

      if(!payload.notReload)
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
      if(error.response && error.response.status === 401){
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
  
  export default function* funcionarioSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_FUNCIONARIO, fetchFuncionario),
      takeLatest(types.ASYNC_LOAD_FUNCIONARIO_ID, fetchFuncionarioById),
      takeLatest(types.ASYNC_CREATE_FUNCIONARIO, createFuncionario),
      takeLatest(types.ASYNC_UPDATE_FUNCIONARIO, updateFuncionario),
      takeLatest(types.ASYNC_SEARCH_FUNCIONARIO, searchFuncionario),
      takeLatest(types.ASYNC_LOAD_LIST_PESSOA, fetchPessoa),
    ]);
  }
  