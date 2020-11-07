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
  import { types as typesSnackBar} from "../ducks/snackbar";
  import * as api from '../services/item';


  function* searchItem ({payload}){
    try {
      yield put ({ 
        type: types.ASYNC_LOAD_ITEM_LICITACAO, 
        payload: { searchTerm : payload.searchTerm, type: payload.type, notReload: true }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function* fetchItem({payload}) {
    try{
      
      if(!payload.notReload)
        yield put({ type: types.ITEM_LOADING });

      let _data = yield select (state => state.licitacao.data);

      let params = {   
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        searchTerm: payload.searchTerm || "",
        type: payload.type,
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

      yield put({ type: types.LOAD_ITEM_ID, payload: response.data });

    }
    catch(error){
      console.log(error)
      yield put({ type: types.LOAD_ITEM, payload: null }); 
    }
  }
 
  function* createItem ({ payload }) {
    try {
      yield put({ type: types.ITEM_LOADING });
      //let response = 
      yield call(api.createItem, payload);
     // yield put({ type: types.LOAD_ITEM, payload: response.data });
      
     yield put ({ 
        type: types.ASYNC_LOAD_ITEM, 
        payload: { searchTerm : "", type: payload.type, notReload: true }
      });
      
      
      yield put({ type: "SET_DIALOG", payload: false});

      yield put({ type: typesSnackBar.SET_SNACKBAR, payload: {type: "success", message: " Item criado com sucesso!" } });
      yield put({ type: typesSnackBar.SHOW_SNACKBAR, payload: true });
      
    } 
    catch (error) {
      console.log(error);
    }

  }

  function* updateItem({payload}){
    try {
      yield put({ type: types.ITEM_LOADING });
      //let response = 
      yield call(api.updateItem, payload.id, payload.values);
      //yield put({ type: types.LOAD_ITEM, payload: response.data });

      yield put ({ 
        type: types.ASYNC_LOAD_ITEM, 
        payload: { searchTerm : "", type: payload.values.type, notReload: true }
      });
      
      yield put({ type: "SET_DIALOG", payload: false});
      yield put({ type: typesSnackBar.SET_SNACKBAR, payload: {type: "success", message: " Item atualizado com sucesso!" } });
      yield put({ type: typesSnackBar.SHOW_SNACKBAR, payload: true });

    } 
    catch (error) {
      console.log(error);
    }
  }
  
  function* deleteItem({payload}){
    try {
      yield put({ type: types.ITEM_LOADING });
      //let response = 
      yield call(api.deleteItem, payload.id);
      //yield put({ type: types.LOAD_ITEM, payload: response.data });
      
      yield put ({ 
        type: types.ASYNC_LOAD_ITEM, 
        payload: { searchTerm : "", type: payload.type, notReload: true }
      });

      yield put({ type: "SET_DIALOG", payload: false});
      yield put({ type: typesSnackBar.SET_SNACKBAR, payload: {type: "success", message: " Item deletado com sucesso!" } });
      yield put({ type: typesSnackBar.SHOW_SNACKBAR, payload: true });

    } 
    catch (error) {
      console.log(error);
    }
  }

  function* deleteItemAll({payload}){
    try {

      yield put({ type: types.ITEM_LOADING });
      //let response = 
      yield call(api.deleteItemAll, payload);
      //yield put({ type: types.LOAD_ITEM, payload: response.data });
      
      yield put ({ 
        type: types.ASYNC_LOAD_ITEM, 
        payload: { searchTerm : "", type: payload.type, notReload: true }
      });
      
      yield put({ type: "SET_DIALOG", payload: false});
      yield put({ type: typesSnackBar.SET_SNACKBAR, payload: {type: "success", message: "Deletado todos os itens com sucesso!" } });
      yield put({ type: typesSnackBar.SHOW_SNACKBAR, payload: true });

      
    } catch (error) {
        console.log(error);
    }
  }
  
  function* importItem({payload}){
    try {
      
      let response = yield call(api.importItem, payload);
      //
      yield put ({ 
        type: types.ASYNC_LOAD_ITEM, 
        payload: { searchTerm : "", type: payload.type, notReload: true }
      });
      
      yield put({ type: "SET_DIALOG", payload: false});
      yield put({ type: typesSnackBar.SET_SNACKBAR, payload: {type: "success", message: " Itens importados com sucesso!" } });
      yield put({ type: typesSnackBar.SHOW_SNACKBAR, payload: true });


    } catch (error) {
      console.log(error);
    }
  }

  function* exportItem ({payload}){
    try {
    
        let response = yield call(api.exportItem, payload);
        let {name, file} = response.data;

        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        a.href = window.URL.createObjectURL(
          new Blob([s2ab(atob(file))], { type: "" })
        );
      
        a.setAttribute("download", name);
        a.click();
      
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);

    } catch (error) {
        console.log(error)
    }
  }

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  export default function* itemSaga() {
    yield all([
      takeLatest(types.ASYNC_SEARCH_ITEM, searchItem),
      takeLatest(types.ASYNC_LOAD_ITEM, fetchItem),
      takeLatest(types.ASYNC_LOAD_ITEM_ID, fetchItemById),
      takeLatest(types.ASYNC_CREATE_ITEM, createItem),
      takeLatest(types.ASYNC_UPDATE_ITEM, updateItem),
      takeLatest(types.ASYNC_DELETE_ITEM, deleteItem),
      takeLatest(types.ASYNC_DELETE_ITEM_ALL, deleteItemAll),
      takeLatest(types.ASYNC_EXPORT_ITEM, exportItem),
      takeLatest(types.ASYNC_IMPORT_ITEM, importItem),
    ]);
  }
  