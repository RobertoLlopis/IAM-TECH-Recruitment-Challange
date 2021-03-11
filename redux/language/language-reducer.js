import LanguageTypes from "./language-types";

export const LanguageInitialState = {
  isChangingLanguage: false,
  changeLanguageError: null,
  currentLanguage: "en",
  currentTexts: [
    { tag: "greeting", valueLang: { es: "Hola", en: "Hello" } },
    {
      tag: "selectLanguage",
      valueLang: { es: "Selecciona idioma", en: "Select language" },
    },
  ],
};

const LanguageReducer = (state = LanguageInitialState, action) => {
  switch (action.type) {
    case LanguageTypes.CHANGE_LANGUAGE_REQUEST: {
      return {
        ...state,
        isChangingLanguage: true,
        changeLanguageError: null,
      };
    }
    case LanguageTypes.CHANGE_LANGUAGE_ERROR: {
      return {
        ...state,
        isChangingLanguage: false,
        changeLanguageError: action.payload,
      };
    }
    case LanguageTypes.CHANGE_LANGUAGE_SUCCESS: {
      return {
        ...state,
        isChangingLanguage: false,
        changeLanguageError: null,
        currentLanguage: action.payload.currentLanguage,
        currentTexts: action.payload.currentTexts,
      };
    }
    default: {
      return state;
    }
  }
};

export default LanguageReducer;
