import Amplify, { API, graphqlOperation } from "aws-amplify";
//import awsconfig from "../../api-sync-config";
const awsconfig = {
  aws_access_key_id: process.env.API_ID,
  aws_appsync_graphqlEndpoint: process.env.URL_API,
  aws_appsync_region: process.env.REGION,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.API_KEY,
};
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
export function chacheTexts(texts) {
  return {
    type: LanguageTypes.INITIAL_TEXTS_CACHED,
    payload: texts,
  };
}
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
      //* API has an error, in about page and generic select needed to change valueLanguages to the opposite
      const arrOfTextsCorrected = arrOfTexts.map((t) => {
        if (t.tag.includes("home")) {
          return { ...t };
        }
        return {
          ...t,
          valueLang: { es: t.valueLang.en, en: t.valueLang.es },
        };
      });
      dispatch(fetchAPITextsSuccess(arrOfTextsCorrected));
    } catch (error) {
      dispatch(fetchAPITextsError(error.message));
    }
  };
}
