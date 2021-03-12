export const chooseUserLang = (lang, change) => {
  const localStorageLang = localStorage.getItem("userLang");
  if (localStorageLang === lang) return;
  if (localStorageLang && localStorageLang !== lang) {
    change(localStorageLang);
    return;
  }
  const browserLang =
    navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2);
  if (browserLang !== lang) change(browserLang);
};
