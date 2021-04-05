const INITIAL_STATE = {
  loading: false,
  forgotPasswordData: {},
};

function forgotPasswordReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FORGOT_PASSWORD_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });
    case "FORGOT_PASSWORD_SUCCESS":
      return Object.assign({}, state, {
        loading: false,
        forgotPasswordData: action.payload.response,
      });
    case "FORGOT_PASSWORD_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    default:
      return state;
  }
}
export default forgotPasswordReducer;
