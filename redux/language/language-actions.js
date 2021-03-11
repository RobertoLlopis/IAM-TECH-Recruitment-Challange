import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../../api-sync-config";
Amplify.configure(awsconfig);
import LanguageTypes from "./language-types";

export const fetchAPITextsRequest = () => ({
  type: LanguageTypes.INITIAL_TEXTS_FETCH_REQUEST,
});

export const fetchAPITextsError = (message) => ({
  type: LanguageTypes.INITIAL_TEXTS_FETCH_ERROR,
  payload: message,
});
export const fetchAPITextsSuccess = (texts) => ({
  type: LanguageTypes.INITIAL_TEXTS_FETCH_SUCCESS,
  payload: texts,
});
export const changeLanguage = (newLanguage) => ({
  type: LanguageTypes.CHANGE_LANGUAGE,
  payload: newLanguage,
});

export function fetchAPITexts() {
  return async function changeLanguageThunk(dispatch) {
    dispatch(fetchAPITextsRequest());
    try {
      const response = await API.graphql(
        graphqlOperation(`{listTranslations {
          tag
          valueLang {
          en
          es
          }
          }}`)
      );
      const arrOfTexts = response.data.listTranslations;
      console.log(arrOfTexts, "AQUI LLEGAAAAAA");
      dispatch(fetchAPITextsSuccess(arrOfTexts));
    } catch (error) {
      dispatch(fetchAPITextsError(error.message));
    }
  };
}
