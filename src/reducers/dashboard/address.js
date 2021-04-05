import ActionTypes from "../../ActionTypes";

const initialState = {
  addresses: [],
  telrPaymentCredentials: [],
  selectedAddress: {},
  billingAddress: {},
  loading: false,
  isSame: true,
};

const Address = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_ADDRESS_REQUEST:
      return {...state, loading: true};
    case ActionTypes.SAVE_ADDRESS_SUCCESS:
      return {...state};
    case ActionTypes.SAVE_ADDRESS_FAIL:
      return {...state, loading: false};
    case ActionTypes.DELETE_ADDRESS_REQUEST:
      return {...state, loading: true};
    case ActionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          i => i.id != action.payload.address_id,
        ),
        selectedAddress: action.payload && action.payload[0],
        billingAddress: action.payload && action.payload[0],
        loading: false,
      };
    case ActionTypes.DELETE_ADDRESS_FAIL:
      return {...state, loading: false};
    case ActionTypes.GET_SAVED_ADDRESS_REQUEST:
      return {...state, loading: true};

    case ActionTypes.GET_SAVED_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        selectedAddress: action.payload && action.payload[0],
        billingAddress: action.payload && action.payload[0],
        isSame: true,
        loading: false,
      };
    case ActionTypes.GET_SAVED_ADDRESS_FAIL:
      return {...state, loading: false};
    case "BILLING_ADDRESS":
      return {
        ...state,
        billingAddress: action.payload.address,
        isSame: action.payload.isSame,
      };
    case "SELECTED_ADDRESS":
      return {
        ...state,
        selectedAddress: action.payload.address,
        isSame: action.payload.isSame,
      };

    case "PAYMENT_CREDENTIAL_SUCCESS":
      return {
        ...state,
        telrPaymentCredentials: action.payload.data,
      };
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return initialState;
    default:
      return state;
  }
};

export default Address;
