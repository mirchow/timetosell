import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import reducers from "./reducers";

const router = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, router),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

export default store;