import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import createStore from "../createStore";

export const render = (
  node,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    ...options
  } = {}
) => {
  const store = createStore(initialState);
  return {
    ...rtlRender(
      <Provider store={store}>
        <Router history={history}>{node}</Router>
      </Provider>,
      options
    ),
    history,
    store
  };
};
