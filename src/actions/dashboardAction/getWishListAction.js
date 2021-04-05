import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import {strings} from "../../constants/i18n";
import RestClient from "../../helper/RestClient";

export function getWishListAction(hideMessageIfEmpty = false) {
  return (dispatch, getState) => {
    dispatch({type: "WISH_LIST_REQUEST"});
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/wishlist?user_id=${ID}`, {
          method: "GET",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "WISH_LIST_SUCCESS",
                payload: responseJson,
              });
            } else if (responseJson.status === 400) {
              if (!hideMessageIfEmpty) {
                CommonToast(responseJson.message);
              }
              dispatch({
                type: "WISH_LIST_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "WISH_LIST_FAIL", responseJson});
            }
          })
          .catch(e => {
            dispatch({type: "WISH_LIST_FAIL", e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        CommonToast(strings.connectionError, false);
        dispatch({type: "WISH_LIST_FAIL", e});
      });
  };
}

export function addWishList(product) {
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
    dispatch({
      type: "ADD_WISH_LIST_REQUEST",
      payload: {
        product_id: data.product_id,
        product: {...product, wishlist_status: !product.wishlist_status},
      },
    });
    if (product.wishlist_status) {
      dispatch({
        type: "DELETE_WISH_LIST_SUCCESS",
        payload: data,
      });
    }
    RestClient.isConnected()
      .then(() => {
        // CommonToast(strings.serverError);
        // });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
      });
    fetch(`${Latest_Server_URL}/add-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.status === 200) {
          CommonToast(responseJson.message);
          if (!product.wishlist_status)
            dispatch({
              type: "ADD_WISH_LIST_SUCCESS",
              payload: data.product_id,
            });
          // dispatch(getWishListAction());
        } else {
          //CommonToast(responseJson.message);
          dispatch({type: "ADD_WISH_LIST_FAIL", responseJson});
        }
      })
      .catch(error => {
        CommonToast(error, false);
        dispatch({type: "ADD_WISH_LIST_FAIL"});
      });
  };
}

export function deleteWishList(data) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    data.user_id = ID;
    dispatch({
      type: "DELETE_WISH_LIST_REQUEST",
      payload: data,
    });
    RestClient.isConnected()
      .then(() => {
        fetch(
          `${Latest_Server_URL}/remove-iteam-wishlist`,

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
                type: "DELETE_WISH_LIST_SUCCESS",
                payload: data,
              });
            } else {
              // CommonToast(responseJson.message);
              dispatch({type: "DELETE_WISH_LIST_FAIL", responseJson});
            }
          })
          .catch(() => {
            dispatch({type: "DELETE_WISH_LIST_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({type: "DELETE_WISH_LIST_FAIL"});
      });
  };
}
