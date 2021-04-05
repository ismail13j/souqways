const INITIAL_STATE = {
  loading: false,
  loader: false,
  cartList: [],
  couponList: [],
  cartCounter: 0,
  discount: {},
  wishListCounter: 0,
  currentProduct: "",
};
function getCartListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CART_LIST_REQUEST":
      return {...state, loading: true};
    case "CART_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        cartList: action.payload.cart_product || [],
      };
    case "ADD_CART_REQUEST":
      return {
        ...state,
        loading: true,
        currentProduct: action.payload,
      };
    case "ADD_CART_FAIL":
      return {
        ...state,
        loading: false,
        currentProduct: "",
      };
    case "UPDATE_CART_LIST_REQUEST":
      let cart = state.cartList.reduce((d, i) => {
        if (i.product_id == action.payload.product_id) {
          d.push({...i, quantity: action.payload.quantity});
        } else {
          d.push(i);
        }
        return d;
      }, []);
      return {
        ...state,
        cartList: cart,
      };
    case "UPDATE_CART_SUCCESS":
      return {
        ...state,
        currentProduct: "",
      };
    case "UPDATE_CART_FAIL":
      return {
        ...state,
        currentProduct: "",
      };

    case "DELETE_CART_LIST_FAIL":
      return {
        ...state,
        loading: false,
        currentProduct: "",
      };
    case "CART_BADGE_UPDATE":
      return {
        ...state,
        cartCounter: state.cartCounter + 1,
        loading: false,
      };
    case "CART_BADGE_CLEAR":
      return {
        ...state,
        cartCounter: 0,
      };
    case "WISH_BADGE_UPDATE":
      return {
        ...state,
        wishListCounter: state.wishListCounter + 1,
        loading: false,
      };
    case "DELETE_CART_LIST_REQUEST":
      return {
        ...state,
        cartList: state.cartList.filter(
          i => i.product_id != action.payload.product_id,
        ),
        currentProduct: "",
        loading: false,
      };
    case "DELETE_CART_LIST_SUCCESS":
      return {
        ...state,
        currentProduct: "",
        cartList: state.cartList.filter(
          i => i.product_id != action.payload.product_id,
        ),
        loading: false,
      };
    case "COUPON_LIST_REQUEST":
      return {...state, loading: true};
    case "COUPON_LIST_FAIL":
      return {...state, loading: false};
    case "COUPON_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        couponList: action.payload.coupon,
      };
    case "REMOVE_ITEM_CARTLIST":
      var cartList = [...state.cartList];
      cartList.splice(action.payload, 1);
      return {
        ...state,
        cartList,
      };

    case "COUP0N_LIST_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });

    case "ADD_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        currentProduct: "",
        cartList: [...state.cartList, ...action.payload.cart_product],
      };
    case "CART_LIST_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });

    case "DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      };

    case "EMPTY_CART_ITEMS":
      return {
        ...state,
        loading: false,
        cartList: [],
        discount: {},
      };
    case "CLEAR_LOADERS":
      return {...state, loading: false, loader: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default getCartListReducer;
