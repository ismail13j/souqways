import ActionTypes from "../../ActionTypes";
import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export const getSavedAddresses = () => {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: ActionTypes.GET_SAVED_ADDRESS_REQUEST});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/user_address?user_id=${ID}`, {
          method: "POST",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              // if (!responseJson.data && fromCart) {
              //   Actions.addAddress();
              // }
              dispatch({
                type: ActionTypes.GET_SAVED_ADDRESS_SUCCESS,
                payload: responseJson.data || [],
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: ActionTypes.GET_SAVED_ADDRESS_FAIL});
            }
          })
          .catch(() => {
            dispatch({type: ActionTypes.GET_SAVED_ADDRESS_FAIL});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: ActionTypes.GET_SAVED_ADDRESS_FAIL});
        CommonToast(strings.connectionError, false);
      });
  };
};
//eslint-disable-next-line
export const saveAddress = (data, cb = () => {}) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SAVE_ADDRESS_REQUEST,
      data: RestClient.createFormData(data),
    });
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/add_address`, {
          method: "POST",
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: ActionTypes.SAVE_ADDRESS_SUCCESS,
                payload: responseJson,
              });
              cb();
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: ActionTypes.SAVE_ADDRESS_FAIL, responseJson});
              cb();
            }
          })
          .catch(e => {
            dispatch({type: ActionTypes.SAVE_ADDRESS_FAIL, e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({type: ActionTypes.SAVE_ADDRESS_FAIL});
      });
  };
};
//eslint-disable-next-line
export const deleteAddress = (data = {}, cb = () => {}) => {
  return dispatch => {
    dispatch({type: ActionTypes.DELETE_ADDRESS_REQUEST});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/delete_address`, {
          method: "POST",
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: ActionTypes.DELETE_ADDRESS_SUCCESS,
                payload: {responseJson, ...data},
              });
              cb();
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: ActionTypes.DELETE_ADDRESS_FAIL});
              cb();
            }
          })
          .catch(() => {
            dispatch({type: ActionTypes.SAVE_ADDRESS_FAIL});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: ActionTypes.SAVE_ADDRESS_FAIL});
        CommonToast(strings.connectionError, false);
      });
  };
};
//eslint-disable-next-line
export const updateAddress = (data, cb = () => {}) => {
  return dispatch => {
    dispatch({type: ActionTypes.UPDATE_ADDRESS_REQUEST});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/add_address`, {
          method: "POST",
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: ActionTypes.UPDATE_ADDRESS_SUCCESS,
                payload: responseJson.data,
              });
              cb();
            } else {
              dispatch({
                type: ActionTypes.UPDATE_ADDRESS_FAIL,
                payload: responseJson.message,
              });
              cb();
            }
          })
          .catch(err => {
            dispatch({type: ActionTypes.UPDATE_ADDRESS_FAIL, payload: err});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: ActionTypes.UPDATE_ADDRESS_FAIL});
        CommonToast(strings.connectionError, false);
      });
  };
};

export function setSelectedAddress(address, isSame) {
  return dispatch => {
    dispatch({type: "SELECTED_ADDRESS", payload: {address, isSame}});
  };
}

export function setBillingAddress(address, isSame) {
  return dispatch => {
    dispatch({type: "BILLING_ADDRESS", payload: {address, isSame}});
  };
}

export function getPaymentCredentials() {
  return dispatch => {
    dispatch({type: "PAYMENT_CREDENTIAL_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/payment`, {
          method: "POST",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "PAYMENT_CREDENTIAL_SUCCESS",
                payload: responseJson,
              });
            } else {
              //CommonToast(responseJson.message);
              dispatch({type: "PAYMENT_CREDENTIAL_FAILURE"});
            }
          })
          .catch(() => {
            dispatch({type: "PAYMENT_CREDENTIAL_FAILURE"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
      });
  };
}
