import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../../api-sync-config";
Amplify.configure(awsconfig);
import LanguageTypes from "./language-types";

export const changeLanguageRequest = () => ({
  type: LanguageTypes.CHANGE_LANGUAGE_REQUEST,
});

export const changeLanguageError = (message) => ({
  type: LanguageTypes.CHANGE_LANGUAGE_ERROR,
  payload: message,
});

export const changeLanguageSuccess = (newLanguage) => ({
  type: LanguageTypes.CHANGE_LANGUAGE_SUCCESS,
  payload: {
    currentLanguage: newLanguage,
    currentTexts: "algo",
  },
});

export function changeLanguage(newLanguage) {
  return async function changeLanguageThunk(dispatch) {
    dispatch(changeLanguageRequest());
    try {
      const response = await API.graphql(
        graphqlOperation(`{listTranslations {
        id
        tag
        valueLang {
        en
        es
        }
        }}`)
      );
      console.log(response);
      dispatch(changeLanguageSuccess(newLanguage));
    } catch (error) {
      dispatch(changeLanguageError(error.message));
    }
  };
}
