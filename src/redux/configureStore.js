import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const action = (type) => store.dispatch({ type });
