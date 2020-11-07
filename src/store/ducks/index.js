import { combineReducers } from "redux";
import loginReducer from './login';
import pessoaReducer from './pessoa';
import funcionarioReducer from './funcionario';
import empresaReducer from './empresa';
import licitacaoReducer from './licitacao';
import cotacaoReducer from './cotacao';
import itemReducer from "./item";
import errorReducer from './error';
import tableReducer from './table';
import dialogReducer from './dialog';
import snackbarReducer from './snackbar';


const rootReducers = combineReducers({
  //form: formReducer,
  login: loginReducer,
  pessoa: pessoaReducer,
  funcionario: funcionarioReducer,
  empresa: empresaReducer,
  licitacao: licitacaoReducer,
  cotacao: cotacaoReducer,
  item: itemReducer,
  table: tableReducer,
  error: errorReducer,
  dialog: dialogReducer,
  snackbar: snackbarReducer,

});
  
  export default rootReducers;