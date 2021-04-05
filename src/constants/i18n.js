import LocalizedStrings from "react-native-localization";
// import {I18nManager} from "react-native";
import en from "./translations/en";
import ar from "./translations/ar";
import {storeObj} from ".././store/setup";
import {Languages} from "./translations/language";
// import {Actions} from "react-native-router-flux";
// import RNRestart from "react-native-restart";
export const strings = new LocalizedStrings({en, ar});

export const getCurrentLanguage = () => {
  let {
    appState: {lang},
  } = storeObj.getState();

  if (lang === "en") {
    return true;
  } else {
    return false;
  }
};
export const changeLanguage = lang => {
  strings.setLanguage(lang);
  let isRTL = lang === "ar";
  // I18nManager.allowRTL(isRTL);
  // I18nManager.forceRTL(isRTL);
  storeObj.dispatch({
    type: "SET_LANGUAGE",
    payload: {lang, isRTL},
  });
  // RNRestart.Restart();
};
export const getLanguage = () => {
  return strings.getLanguage();
};

export const getAvailableLang = () => {
  var avaiableLanguages = strings.getAvailableLanguages();
  return Languages.reduce((lang, item) => {
    if (avaiableLanguages.includes(item.iso)) {
      lang.push({
        id: item.iso,
        value: item.name,
        nativeName: item.nativeName,
      });
    }
    return lang;
  }, []);
};
