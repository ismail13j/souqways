const INITIAL_STATE = {isLoggedIn: false, lang: "en", langLoader: false};

function appState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CLEAR_LOADERS":
      return {...state, langLoader: false};
    case "LOGIN_SUCCESS":
      return Object.assign(
        {},
        {
          isLoggedIn: true,
        },
      );
    case "LOGOUT_SUCCESS":
      return Object.assign(
        {},
        {
          isLoggedIn: false,
        },
      );
    case "SET_LANGUAGE":
      return {
        ...state,
        loading: false,
        lang: action.payload.lang,
        langLoader: false,
      };
    case "LANGUAGE_REQUEST":
      return {...state, langLoader: true};
    case "LANGUAGE_SUCCESS":
      return {...state, langLoader: false};
    case "LANGUAGE_FAIL":
      return {...state, langLoader: false};
    default:
      return state;
  }
}
export default appState;
