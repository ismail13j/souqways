const INITIAL_STATE = {
  loading: false,
  payload: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "NOTIFICATION_RESET":
      return {...state, payload: []};
    case "NOTIFICATION_REQUEST":
      return {...state, loading: true};
    case "NOTIFICATION_SUCCESS":
      return {
        ...state,
        loading: false,
        payload: action.payload.notification,
        totalPage: action.payload.total_page,
      };
    case "NOTIFICATION_FAIL":
      return {...state, loading: false};
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
};
