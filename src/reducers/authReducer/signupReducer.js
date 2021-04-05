const INITIAL_STATE = {
  loading: false,
  signUpResponse: null,
};
function signUpReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SIGN_UP_REQUEST":
      return {...state, loading: true};
    case "SIGN_UP_SUCCESS":
      return Object.assign({}, state, {
        loading: false,
        //signUpResponse:action.payload.response
      });

    case "SIGN_UP_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    default:
      return state;
  }
}
export default signUpReducer;
