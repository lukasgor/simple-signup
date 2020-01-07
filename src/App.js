import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Signup from "./Signup";
import ThankYou from "./ThankYou";
import createStore from "./createStore";

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route path="/thank-you" component={ThankYou} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
