import { combineReducers } from "redux";
//import { reducer as formReducer } from "redux-form";
import loginReducer from './login';
import pessoaReducer from './pessoa';
import funcionarioReducer from './funcionario';
import empresaReducer from './empresa';
import licitacaoReducer from './licitacao';
import itemReducer from "./item";
import errorReducer from './error';
import tableReducer from './table';


const rootReducers = combineReducers({
  //form: formReducer,
  login: loginReducer,
  pessoa: pessoaReducer,
  funcionario: funcionarioReducer,
  empresa: empresaReducer,
  licitacao: licitacaoReducer,
  item: itemReducer,
  table: tableReducer,
  error: errorReducer,

});
  
  export default rootReducers;