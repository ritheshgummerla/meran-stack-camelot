import {createStore,applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "../reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../sagas/adminSaga"   

const sagaMiddleware = createSagaMiddleware();

const root = combineReducers({
    reducer:rootReducer
}) 
const composeEnhancers = composeWithDevTools({});
const middlewares = applyMiddleware(sagaMiddleware);
const store = createStore(root, composeEnhancers(middlewares));
sagaMiddleware.run(rootSaga);
export default store