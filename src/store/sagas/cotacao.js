import {
    all,
    takeLatest,
    put,
    call,
  } from "redux-saga/effects";

  import { types } from "../ducks/cotacao"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/cotacao';


  function* searchCotacao ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_COTACAO, 
        payload: { searchTerm : payload.searchTerm, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchCotacao({payload}) {
    try{

      if(!payload.notReload)
        yield put({ type: types.COTACAO_LOADING });

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || ""
      };
      
      let response = yield call(api.fetchCotacao, params);

      const { current_page, last_page, data, total, per_page } = response.data;

      yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
      yield put({ type: types.LOAD_COTACAO, payload: data });

    }
    catch(error){
      //console.log({error})
      if(error.response && error.response.status === 401){
        yield put({ type: typesError.ERROR, payload: [] })
      }
      else { //(error.message){
        yield put({ type: types.COTACAO_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOAD_COTACAO, payload: null }); 
    }
  }


  function* fetchCotacaoById({ payload }) {
    try{
      yield put({ type: types.COTACAO_LOADING });
      
      let response = yield call(api.fetchCotacaoById, payload);

      yield put({ type: types.LOAD_COTACAO, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_COTACAO, payload: null }); 
    }
  }
 
  function* createCotacao ({ payload }) {
    try {
      yield put({ type: types.COTACAO_LOADING });
      let response = yield call(api.createCotacao, payload);
      yield put({ type: types.LOAD_COTACAO, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateCotacao({payload}){
    try {
      yield put({ type: types.COTACAO_LOADING });
      let response = yield call(api.updateCotacao, payload.id, payload.values);
      yield put({ type: types.LOAD_COTACAO, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  export default function* cotacaoSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_COTACAO, fetchCotacao),
      takeLatest(types.ASYNC_LOAD_COTACAO_ID, fetchCotacaoById),
      takeLatest(types.ASYNC_CREATE_COTACAO, createCotacao),
      takeLatest(types.ASYNC_UPDATE_COTACAO, updateCotacao),
      takeLatest(types.ASYNC_SEARCH_COTACAO, searchCotacao),
    ]);
  }
  