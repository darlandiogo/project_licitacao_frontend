import {
    all,
    takeLatest,
    put,
    call,
    select,
  } from "redux-saga/effects";

  import { types } from "../ducks/item"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/item';


  function* searchItemLicitacao ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_ITEM_LICITACAO, 
        payload: { searchTerm : payload.searchTerm, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchItemLicitacao({payload}) {
    try{
      
      if(!payload.notReload)
        yield put({ type: types.ITEM_LOADING });

      let _data = yield select (state => state.licitacao.data);

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || "",
        type: "licitacao",
        type_id: (_data.id ? _data.id : "")
      };
      
      let response = yield call(api.fetchItem, params);

      const { current_page, last_page, data, total, per_page } = response.data;

      yield put({ type: typesTable.UPDATE_TABLE_PAGINATION, payload: { totalRows: total, currentPage: current_page , perPage: per_page, lastPage: last_page } });
      yield put({ type: types.LOAD_ITEM, payload: data });

    }
    catch(error){
      if(error.response && error.response.status === 401){
        yield put({ type: typesError.ERROR, payload: [] })
      }
      else { //(error.message){
        yield put({ type: types.ITEM_ERROR, payload: JSON.parse(error.message) })
      }
      yield put({ type: types.LOAD_ITEM, payload: null }); 
    }
  }


  function* fetchItemById({ payload }) {
    try{
      yield put({ type: types.ITEM_LOADING });
      
      let response = yield call(api.fetchItemById, payload);

      yield put({ type: types.LOAD_ITEM, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_ITEM, payload: null }); 
    }
  }
 
  function* createItem ({ payload }) {
    try {
      yield put({ type: types.ITEM_LOADING });
      let response = yield call(api.createItem, payload);
      yield put({ type: types.LOAD_ITEM, payload: response.data });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateItem({payload}){
    try {
      yield put({ type: types.ITEM_LOADING });
      let response = yield call(api.updateItem, payload.id, payload.values);
      yield put({ type: types.LOAD_ITEM, payload: response.data });
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  export default function* itemSaga() {
    yield all([
      takeLatest(types.ASYNC_SEARCH_ITEM_LICITACAO, searchItemLicitacao),
      takeLatest(types.ASYNC_LOAD_ITEM_LICITACAO, fetchItemLicitacao),
      takeLatest(types.ASYNC_LOAD_ITEM_ID, fetchItemById),
      takeLatest(types.ASYNC_CREATE_ITEM, createItem),
      takeLatest(types.ASYNC_UPDATE_ITEM, updateItem),
      
    ]);
  }
  