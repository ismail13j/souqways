const INITIAL_STATE = {
  loading: false,
  loader: false,
  wishList: [],
  wishCounter: 0,
  currentProduct: "",
};

function getWishListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "WISH_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        loader: true,
      };
    case "WISH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        loader: false,
        wishList: action.payload.products,
      };
    case "DELETE_WISH_LIST_REQUEST":
      return {
        ...state,
        loader: false,
        wishList: state.wishList.filter(
          i => i.post_id !== action.payload.product_id,
        ),
        currentProduct: action.payload.product_id,
      };
    case "DELETE_WISH_LIST_FAIL":
      return {...state, loader: false};
    case "DELETE_WISH_LIST_SUCCESS":
      return {
        ...state,
        loader: false,
        currentProduct: "",
      };
    case "REMOVE_ITEM_WISHLIST":
      return {
        ...state,
        loading: false,
        wishList: state.wishList.remove(action.payload.index),
      };
    case "ADD_WISH_LIST_REQUEST":
      if (action.payload.product.wishlist_status) {
        return {
          ...state,
          loading: true,
          currentProduct: action.payload.product_id,
          wishList: [...state.wishList, action.payload.product],
        };
      } else {
        let index = state.wishList.findIndex(
          item => item.post_id == action.payload.product.post_id,
        );
        let wishList = [...state.wishList];
        wishList.splice(index, 1);
        return {
          ...state,
          loading: true,
          currentProduct: action.payload.product_id,
          wishList,
        };
      }

    case "ADD_WISH_LIST_SUCCESS":
      return {...state, loading: false, currentProduct: ""};
    case "ADD_WISH_LIST_FAIL":
      return {...state, loading: false, currentProduct: ""};
    case "WISH_LIST_FAIL":
      return {...state, loading: false};
    case "WISH_BADGE_UPDATE":
      return {
        ...state,
        loading: false,
        wishCounter: state.wishCounter + 1,
      };
    case "CLEAR_LOADERS":
      return {...state, loading: false, loader: false};

    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default getWishListReducer;
