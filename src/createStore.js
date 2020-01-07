import { createStore as makeStore, combineReducers } from "redux";
import consents from "./consentsReducer";

const createStore = initialState =>
  makeStore(combineReducers({ consents }), initialState);

export default createStore;
