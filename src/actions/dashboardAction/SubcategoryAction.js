import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export function getSubCategoryAction(pageNo) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: "SUB_CATEGORY_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(
          `${Latest_Server_URL}/category-product?user_id=${ID}&page=${pageNo}`,
          {
            method: "GET",
          },
        )
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              // let  count={pagecount:page}

              dispatch({
                type: "SUB_CATEGORY_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "SUB_CATEGORY_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "SUB_CATEGORY_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "SUB_CATEGORY_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function getProductInfoAction(item) {
  return dispatch => {
    dispatch({
      type: "GET_PRODUCT_INFO",
      payload: item,
    });
  };
}

export function getProductListAction(item, name) {
  return dispatch => {
    dispatch({
      type: "GET_PRODUCT_LIST",
      payload: {item, name},
    });
  };
}
