import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import LanguageTypes from "./language/language-types";

const InitialState = {
  page: {
    isChangingLanguage: false,
    changeLanguageError: null,
    currentLanguage: "en",
  },
  app: {
    currentTexts: [],
  },
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.app === InitialState.app) delete action.payload.app;
      if (action.payload.page === InitialState.page) delete action.payload.page;
    case LanguageTypes.CHANGE_LANGUAGE_REQUEST: {
      return {
        ...state,
        page: {
          ...state.page,
          isChangingLanguage: true,
          changeLanguageError: null,
        },
      };
    }
    case LanguageTypes.CHANGE_LANGUAGE_ERROR: {
      return {
        ...state,
        page: {
          ...state.page,
          isChangingLanguage: false,
          changeLanguageError: action.payload,
        },
      };
    }
    case LanguageTypes.CHANGE_LANGUAGE_SUCCESS: {
      return {
        ...state,
        page: {
          ...state.page,
          isChangingLanguage: false,
          changeLanguageError: null,
          currentLanguage: action.payload.currentLanguage,
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
