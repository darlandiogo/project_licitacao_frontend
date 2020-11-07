import { all } from "redux-saga/effects";

import LoginSaga  from './login';
import PessoaSaga from './pessoa';
import FuncionarioSaga from './funcionario';
import EmpresaSaga from './empresa';
import LicitacaoSaga from './licitacao';
import CotacaoSaga from './cotacao';
import ItemSaga from "./item";


export default function* rootSaga() {
  yield all([
    LoginSaga(), 
    PessoaSaga(), 
    FuncionarioSaga(),
    EmpresaSaga(),
    LicitacaoSaga(),
    CotacaoSaga(),
    ItemSaga(),
  ]);
  
}
