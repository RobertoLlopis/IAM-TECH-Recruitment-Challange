import { HYDRATE } from "next-redux-wrapper";
import LanguageTypes from "./language-types";

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

export const languageReducer = (state = InitialState, action) => {
  switch (action.type) {
    case HYDRATE:
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
    case LanguageTypes.INITIAL_TEXTS_CACHED: {
      console.log(action.payload);
      return {
        ...state,
        server: {
          ...state.server,
          texts: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
