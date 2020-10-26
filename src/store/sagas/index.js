import { all } from "redux-saga/effects";

import LoginSaga  from './login';
import PessoaSaga from './pessoa';
import FuncionarioSaga from './funcionario';
import EmpresaSaga from './empresa';
import LicitacaoSaga from './licitacao';

export default function* rootSaga() {
  yield all([
    LoginSaga(), 
    PessoaSaga(), 
    FuncionarioSaga(),
    EmpresaSaga(),
    LicitacaoSaga(),
  ]);
  
}
