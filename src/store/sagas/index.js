import { all } from "redux-saga/effects";

import LoginSaga  from './login';
import PessoaSaga from './pessoa';

export default function* rootSaga() {
  yield all([
    LoginSaga(), PessoaSaga()

  ]);
  
}
