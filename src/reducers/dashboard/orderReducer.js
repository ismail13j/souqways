const INITIAL_STATE = {
  loading: false,
  categoryList: [],
  orderList: [],
  orderPlaced: [],
  orderStatus: {},
};

function orderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ORDER_REQUEST":
      return Object.assign({}, state, {
        loading: true,
      });
    case "ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        orderList: action.payload.orders,
      };
    case "ORDER_PLACE_FAIL":
      return {...state, loading: false};
    case "ORDER_PLACE_REQUEST":
      return {...state, loading: true};
    case "ORDER_PLACE_SUCCESS":
      return {
        ...state,
        loading: false,
        orderPlaced: action.payload,
      };
    case "ORDER_FAIL":
      return Object.assign({}, state, {
        loading: false,
      });
    case "ORDER_STATUS_REQUEST":
      return {...state, orderStatus: {}, loading: true};
    case "ORDER_STATUS_SUCCESS":
      return {...state, orderStatus: action.payload, loading: false};
    case "ORDER_STATUS_FAIL":
      return {...state, loading: false};
    case "ORDER_CANCEL_REQUEST":
      return {...state, loading: true};
    case "ORDER_CANCEL_SUCCESS":
      return {
        ...state,
        orderList: state.orderList.reduce((d, i) => {
          if (i.order_id === action.payload.order_id) {
            d.push({
              ...i,
              status: "cancelled",
            });
          } else {
            d.push(i);
          }
          return d;
        }, []),
        loading: false,
      };
    case "ORDER_CANCEL_FAIL":
      return {...state, loading: false};
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default orderReducer;
