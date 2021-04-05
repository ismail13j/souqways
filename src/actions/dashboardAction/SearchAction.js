import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";
import {Latest_Server_URL} from "../../constants/url";

export function getSearchProductAction(data) {
  return dispatch => {
    dispatch({type: "SEARCH_REQUEST", data});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/product-search`, {
          method: "POST",
          body: data,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "SEARCH_SUCCESS",
                payload: responseJson,
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "SEARCH_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "SEARCH_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "SEARCH_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function onCancelData() {
  return dispatch => {
    dispatch({type: "LIST_CLEAR"});
  };
}
