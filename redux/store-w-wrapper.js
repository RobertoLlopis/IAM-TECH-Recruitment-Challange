import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import LanguageTypes from "./language/language-types";

const InitialState = {
  client: {
    currentLanguage: "en",
  },
  server: {
    texts: [],
    isFetchingTexts: false,
    fetchingTextsError: null,
  },
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case HYDRATE:
      /* if (action.payload.client === InitialState.client)
        delete action.payload.client; */
      if (action.payload.server === InitialState.server)
        delete action.payload.server;
      return {
        ...state,
        ...action.payload,
      };
    case LanguageTypes.CHANGE_LANGUAGE: {
      return {
        ...state,
        client: {
          ...state.client,
          currentLanguage: action.payload,
        },
      };
    }
    case LanguageTypes.INITIAL_TEXTS_FETCH_REQUEST: {
      return {
        ...state,
        server: {
          ...state.server,
          isFetchingTexts: true,
          fetchingTextsError: null,
        },
      };
    }
    case LanguageTypes.INITIAL_TEXTS_FETCH_ERROR: {
      return {
        ...state,
        server: {
          ...state.server,
          isFetchingTexts: false,
          fetchingTextsError: action.payload,
        },
      };
    }
    case LanguageTypes.INITIAL_TEXTS_FETCH_SUCCESS: {
      return {
        ...state,
        server: {
          isFetchingTexts: false,
          fetchingTextsError: null,
          texts: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const makeStore = (context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });
