import { combineReducers } from "redux";
//import { reducer as formReducer } from "redux-form";
import loginReducer from './login';
import pessoaReducer from './pessoa';
import errorReducer from './error';
import tableReducer from './table';

const rootReducers = combineReducers({
  //form: formReducer,
  login: loginReducer,
  pessoa: pessoaReducer,
  table: tableReducer,
  error: errorReducer,

});
  
  export default rootReducers;