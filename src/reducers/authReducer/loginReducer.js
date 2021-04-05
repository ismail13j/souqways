const INITIAL_STATE = {
  loading: false,
  loginData: {},
  userData: {},
  userInfo: {},
  isRemind: false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });
    case "LOGIN_SUCCESS":
      return Object.assign({}, state, {
        loading: false,
        isRemind: action.isRemind,
        userData: action.payload.data,
        loginData: action.payload.data,
      });

    case "LOGIN_TOKEN_UPDATE":
      return Object.assign({}, state, {
        loading: false,
        loginData: {...state.loginData, token: action.payload},
      });

    case "USER_INFORMATION_UPDATED":
      return Object.assign({}, state, {
        loading: false,
        userData: {
          ...state.userData,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          contact_number: action.payload.contact_number,
        },
      });
    case "EDIT_PROFILE_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });

    case "EDIT_PROFILE_SUCCESS":
      if (!action.payload) {
        return {...state, loading: false};
      }
      return {
        ...state,
        loading: false,
        userData: {...state.userData, data: action.payload},
        loginData: {...state.loginData, data: action.payload},
      };

    case "EDIT_PROFILE_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "LOGIN_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default loginReducer;
