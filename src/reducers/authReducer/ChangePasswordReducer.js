const INITIAL_STATE = {
  loading: false,
  changePasswordData: {},
};

function changePasswordReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CHANGE_PASSWORD_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });
    case "CHANGE_PASSWORD_SUCCESS":
      return Object.assign({}, state, {
        loading: false,
        changePasswordData: action.payload.response,
      });
    case "CHANGE_PASSWORD_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    default:
      return state;
  }
}
export default changePasswordReducer;
