import {
    all,
    takeLatest,
    put,
    call,
  } from "redux-saga/effects";

  import { types } from "../ducks/licitacao"; 
  //import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/licitacao';

  function* searchLicitacao ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_LICITACAO, 
        payload: { searchTerm : payload.searchTerm, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchLicitacao({payload}) {
    try{

        if(!payload.notReload)
            yield put({ type: types.LICITACAO_LOADING });

        let params = {   
            page: payload.page || 1,
            perPage: payload.perPage || 10,
            searchTerm: payload.searchTerm || ""
        };
        
        let response = yield call(api.fetchLicitacao, params);

        const { current_page, last_page, data, total, per_page } = response.data;

        yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
        yield put({ type: types.LOAD_LICITACAO, payload: data });

   
      } catch (error) {
          console.log(error)
      }
}

function* fetchLicitacaoById({payload}){
  try {

    yield put({ type: types.LICITACAO_LOADING });
    
    let response = yield call(api.fetchLicitacaoById, payload);

    yield put({ type: types.LOAD_LICITACAO, payload: response.data });
    
  } catch (error) {
    console.log(error)
    yield put({ type: types.LOAD_LICITACAO, payload: null }); 
  }
}




  function* createLicitacao ({ payload }) {
    try {
      yield put({ type: types.LICITACAO_LOADING });
      let response = yield call(api.createLicitacao, payload);
      yield put({ type: types.LOAD_LICITACAO, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateLicitacao({payload}){
    try {
      yield put({ type: types.LICITACAO_LOADING });
      let response = yield call(api.updateLicitacao, payload.id, payload.values);
      yield put({ type: types.LOAD_LICITACAO, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }

  function* fetchSelectOptions(){
    try {

      let response = yield call(api.Selectoptions);
      yield put({ type: types.LOAD_SELECTOPTIONS, payload: response.data });
      
    } catch (error) {
      console.log(error)
      yield put({ type: types.LOAD_SELECTOPTIONS, payload: null }); 
    }
  }

  export default function* licitacaoSaga() {
    yield all([
        takeLatest(types.ASYNC_SEARCH_LICITACAO, searchLicitacao),
        takeLatest(types.ASYNC_LOAD_LICITACAO, fetchLicitacao),
        takeLatest(types.ASYNC_LOAD_LICITACAO_ID, fetchLicitacaoById),
        takeLatest(types.ASYNC_CREATE_LICITACAO, createLicitacao),
        takeLatest(types.ASYNC_UPDATE_LICITACAO, updateLicitacao),
        takeLatest(types.ASYNC_LOAD_SELECTOPTIONS, fetchSelectOptions),
    ]);
  }
  