import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export function getCategoryAction(pageNo = 1) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();

    dispatch({type: "CATEGORY_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/categories?user_id=${ID}&page=${pageNo}`, {
          method: "GET",
          timeout: 1000 * 1 * 60,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "CATEGORY_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "CATEGORY_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "CATEGORY_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "CATEGORY_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function getClothAction(pageNo = 1, cb = () => {}) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    let data = new FormData();
    data.append("user_id", ID);
    data.append("page", pageNo);
    if (pageNo == 1) {
      dispatch({type: "CLOTH_REQUEST_RESET", data});
    }
    dispatch({type: "CLOTH_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/clothing-apparel`, {
          method: "POST",
          body: data,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "CLOTH_SUCCESS",
                payload: responseJson,
              });
              cb();
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "CLOTH_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "CLOTH_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "CLOTH_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}
