const INITIAL_STATE = {
  loading: false,
  searchList: [],
  orderList: [],
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return Object.assign({}, state, {
        loading: true,
        searchList: [],
      });
    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        searchList: action.payload.products,
      };
    case "SEARCH_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });

    case "LIST_CLEAR":
      return Object.assign({}, state, {
        loading: false,
        searchList: [],
      });

    case "ADD_WISH_LIST_SUCCESS":
      let searchList = state.searchList.reduce((list, i) => {
        if (i.post_id === action.payload) {
          list.push({...i, wishlist_status: true});
        } else {
          list.push(i);
        }
        return list;
      }, []);
      return {...state, searchList};
    case "ADD_CART_SUCCESS":
      let search = state.searchList.reduce((list, i) => {
        if (i.post_id === action.payload.product_id) {
          list.push({...i, cart_status: !i.cart_status});
        } else {
          list.push(i);
        }
        return list;
      }, []);
      return {...state, searchList: search};
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default searchReducer;
