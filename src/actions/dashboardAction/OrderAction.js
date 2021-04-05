import {CommonToast} from "../../components/CommonToast";
import {Actions} from "react-native-router-flux";
import {getCategoryAction, getClothAction} from "./CategoryAction";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";
import {Latest_Server_URL} from "../../constants/url";

export function getOrderAction() {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: "ORDER_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/order-list?user_id=${ID}`, {
          method: "GET",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "ORDER_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message);
              dispatch({type: "ORDER_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "ORDER_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({type: "ORDER_FAIL"});
      });
  };
}

export const createOrder = order => {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
      getCartListReducer: {discount, cartList},
    } = getState();
    dispatch({type: "ORDER_PLACE_REQUEST"});
    order = {
      ...order,
      customer_id: ID.toString(),
      coupon_lines: discount,
      line_items: cartList.reduce((data, item) => {
        data.push({product_id: item.product_id, quantity: item.quantity});
        return data;
      }, []),
    };

    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/create-order`, {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "ORDER_PLACE_SUCCESS",
                payload: responseJson,
              });
              if (order.payment_method == "wctelr") {
                Actions.webView({
                  title: responseJson.orders && responseJson.orders.order_key,
                  uri:
                    responseJson.paymentData &&
                    responseJson.paymentData[0] &&
                    responseJson.paymentData[0].redirect,
                  order: responseJson.orders,
                  product_id:
                    order.line_items &&
                    order.line_items[0] &&
                    order.line_items[0].product_id,
                });
              } else {
                dispatch({
                  type: "EMPTY_CART_ITEMS",
                });
                dispatch(getCategoryAction());
                dispatch(getClothAction());
                CommonToast(responseJson.message);
                Actions.orderConfirmation({
                  order_id: responseJson.orders && responseJson.orders.id,
                  product_id:
                    order.line_items &&
                    order.line_items[0] &&
                    order.line_items[0].product_id,
                  success: true,
                });
              }
            } else {
              CommonToast(responseJson.message, false);
              dispatch({
                type: "ORDER_PLACE_FAIL",
                payload: responseJson.message,
              });
            }
          })
          .catch(() => {
            dispatch({
              type: "ORDER_PLACE_FAIL",
            });
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({
          type: "ORDER_PLACE_FAIL",
        });
      });
  };
};

export const getOrderStatus = (order_id, product_id) => {
  return dispatch => {
    dispatch({
      type: "ORDER_STATUS_REQUEST",
      payload: {order_id, product_id},
    });
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/order-tracking`, {
          method: "POST",
          body: JSON.stringify({order_id, product_id}),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(res => res.json())
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "ORDER_STATUS_SUCCESS",
                payload: {
                  status: responseJson.order_tracking,
                  order_id,
                  product_id,
                },
              });
            } else {
              dispatch({
                type: "ORDER_STATUS_FAIL",
              });
            }
          })
          .catch(() => {
            dispatch({
              type: "ORDER_STATUS_FAIL",
            });
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({
          type: "ORDER_STATUS_FAIL",
        });
      });
  };
};

export const updatePaymentStatus = (
  order_id,
  payment_response,
  cb = () => {},
) => {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({
      type: "UPDATE_PAYMENT_STATUS_REQUEST",
    });
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/payment-response`, {
          method: "POST",
          body: JSON.stringify({
            order_id,
            customer_id: ID,
            payment_response,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(res => res.json())
          .then(responseJson => {
            CommonToast(responseJson.message);
            if (responseJson.status === 200) {
              dispatch({
                type: "EMPTY_CART_ITEMS",
              });
              dispatch(getCategoryAction());
              dispatch(getClothAction());
              dispatch({
                type: "UPDATE_PAYMENT_STATUS_SUCCESS",
                responseJson,
              });
            } else {
              dispatch({
                type: "UPDATE_PAYMENT_STATUS_FAIL",
                responseJson,
              });
            }
            cb(payment_response);
          })
          .catch(() => {
            dispatch({
              type: "UPDATE_PAYMENT_STATUS_FAIL",
            });
          });
      })
      .catch(() => {
        dispatch({
          type: "UPDATE_PAYMENT_STATUS_FAIL",
        });
      });
  };
};

export const cancelOrder = order => {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: "ORDER_CANCEL_REQUEST"});
    order = {
      ...order,
      customer_id: ID.toString(),
    };
    //http://34.211.31.84:7076/index.php/wp-json/wp/v2/order-cancel
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/order-cancel`, {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch(getOrderStatus(order.order_id, order.product_id));

              CommonToast(responseJson.message);
              dispatch({
                type: "ORDER_CANCEL_SUCCESS",
                payload: {responseJson, ...order},
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({
                type: "ORDER_CANCEL_FAIL",
                payload: responseJson.message,
              });
            }
          })
          .catch(() => {
            dispatch({
              type: "ORDER_CANCEL_FAIL",
            });
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({
          type: "ORDER_CANCEL_FAIL",
        });
      });
  };
};
