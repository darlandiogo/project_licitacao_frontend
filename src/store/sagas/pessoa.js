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

  import { types } from "../ducks/pessoa"; 
  import { types as typesError } from "../ducks/error";
  import { types as typesTable } from '../ducks/table';
  import * as api from '../services/pessoa';

  

  function* fetchPessoa({ payload }) {
    try{

      yield put({ type: types.PESSOA_LOADING });

      /*let errors = validateEmpty(payload);
      if(errors){
        throw new Error(errors);
      } */
      
      let response = yield call(api.fetchPessoa, payload);
      
      console.log(response.data)

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
 
  
  export default function* pessoaSaga() {
    yield all([
      takeLatest(types.ASYNC_LOAD_PESSOA, fetchPessoa),
    ]);
  }
  