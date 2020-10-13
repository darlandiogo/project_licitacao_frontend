import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducers from "./ducks";
import rootSaga from "./sagas";
//import config from "../config";

const options = {
    // options are... optional
    /*authEndpoint: config('pusher_auth'),
    cluster: "us2",
    useTLS: true */
  };
  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga);

//delayConfiguration(store, config('pusher_key'), options);

export default store;

