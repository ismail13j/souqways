const INITIAL_STATE = {
  loading: false,
  categoryList: [],
};

function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CATEGORY_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });
    case "CLEAR_CATEGORY_DATA":
      return {...state, categoryList: []};
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        categoryList: {...state.categoryList, ...action.payload.response},
      };
    case "CATEGORY_FAIL":
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

export default categoryReducer;
