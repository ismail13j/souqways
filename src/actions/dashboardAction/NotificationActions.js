import {Latest_Server_URL} from "../../constants/url";
import RestClient from "../../helper/RestClient";
import {CommonToast} from "../../components/CommonToast";
import {strings} from "../../constants/i18n";

export const getNotification = (pageNo = 1) => {
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
      dispatch({type: "NOTIFICATION_RESET", data});
    }
    dispatch({type: "NOTIFICATION_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/notification-list`, {
          method: "POST",
          body: data,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "NOTIFICATION_SUCCESS",
                payload: responseJson,
              });
            } else {
              dispatch({type: "NOTIFICATION_FAIL", payload: responseJson});
            }
          })
          .catch(error => {
            dispatch({type: "NOTIFICATION_FAIL", payload: error});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({type: "NOTIFICATION_FAIL"});
      });
  };
};
