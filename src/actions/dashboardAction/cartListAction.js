import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {deleteWishList} from "./getWishListAction";
import {strings} from "../../constants/i18n";
export function getCartListAction(hideMessageIfEmpty = false) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: "CART_LIST_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/listing-to-cart?user_id=${ID}`, {
          method: "GET",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "CART_LIST_SUCCESS",
                payload: responseJson,
              });
            } else if (responseJson.status === 400) {
              if (!hideMessageIfEmpty) {
                CommonToast(responseJson.message);
              }
              dispatch({
                type: "CART_LIST_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "CART_LIST_FAIL", responseJson});
            }
          })
          .catch(e => {
            dispatch({type: "CART_LIST_FAIL", e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        dispatch({type: "CART_LIST_FAIL", e});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function getCouponsListAction() {
  return dispatch => {
    dispatch({type: "COUPON_LIST_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/coupon-list`, {
          method: "GET",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "COUPON_LIST_SUCCESS",
                payload: responseJson,
              });
            } else {
              //CommonToast(responseJson.message);
              dispatch({type: "COUPON_LIST_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "COUPON_LIST_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "COUPON_LIST_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function addCartList(product, fromWishList) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    let data = {
      product_id: product.post_id,
      user_id: ID,
      quantity: product.quantity,
    };

    dispatch({type: "ADD_CART_REQUEST", payload: data.product_id});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/add-to-cart`, {
          method: "POST",
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              CommonToast(responseJson.message);
              dispatch({
                type: "ADD_CART_SUCCESS",
                payload: {
                  product_id: data.product_id,
                  cart_product: responseJson.cart_product,
                },
              });
              if (product.cart_status && data.quantity === 1) {
                dispatch({
                  type: "DELETE_CART_LIST_SUCCESS",
                  payload: {...data, product_id: data.product_id},
                });
              }
              if (fromWishList) {
                dispatch(deleteWishList(data));
              }
              // dispatch(getCartListAction());
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "ADD_CART_FAIL", responseJson});
            }
          })
          .catch(() => {
            dispatch({type: "ADD_CART_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "ADD_CART_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}
export function updateCart(data) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();

    dispatch({
      type: "UPDATE_CART_LIST_REQUEST",
      payload: {...data},
    });
    data.user_id = ID;
    //http://34.211.31.84:7076/index.php/wp-json/wp/v2/cart-quantity
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/cart-quantity`, {
          method: "POST",
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "UPDATE_CART_SUCCESS",
                payload: responseJson.cart_product,
              });

              //   dispatch(getCartListAction());
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "UPDATE_LIST_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "UPDATE_CART_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "UPDATE_CART_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function deleteCartList(data) {
  return (dispatch, getState) => {
    let {
      getCartListReducer: {cartList},
    } = getState();
    let product_id = cartList.find(item => item.key === data.key).product_id;
    dispatch({type: "DELETE_CART_LIST_REQUEST", payload: {product_id}});
    RestClient.isConnected()
      .then(() => {
        fetch(
          `${Latest_Server_URL}/remove-iteam-cart`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        )
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              CommonToast(responseJson.message);
              dispatch({
                type: "DELETE_CART_LIST_SUCCESS",
                payload: {...data, product_id},
              });
            }
          })
          .catch(() => {
            dispatch({type: "DELETE_CART_LIST_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "DELETE_CART_LIST_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function discountValue(data) {
  return dispatch => {
    dispatch({type: "DISCOUNT", payload: data});
  };
}
