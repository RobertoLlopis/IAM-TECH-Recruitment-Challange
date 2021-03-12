import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { languageReducer } from "./language/language-reducer";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const makeStore = (context) =>
  createStore(
    languageReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

export const wrapper = createWrapper(makeStore, { debug: true });
