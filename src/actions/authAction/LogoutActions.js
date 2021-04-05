import {Actions} from "react-native-router-flux";

import {Latest_Server_URL} from "../../constants/url";
import {changeLanguage, strings} from "../../constants/i18n";
import RestClient from "../../helper/RestClient";
import {CommonToast} from "../../components/CommonToast";
import PushNotification from "../../helper/pushNotifications";

export function updateTheLanguage(lng) {
  return (dispatch, getState) => {
    let {
      loginReducer: {
        loginData: {
          data: {ID},
        },
      },
    } = getState();
    dispatch({type: "LANGUAGE_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/language?lang_code=${lng}&user_id=${ID}`, {
          method: "Get",
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              CommonToast(responseJson.message);
              changeLanguage(lng);
              dispatch({
                type: "LANGUAGE_SUCCESS",
                payload: responseJson,
              });
            } else {
              dispatch({type: "LANGUAGE_FAIL"});
            }
          })
          .catch(() => {
            dispatch({type: "LANGUAGE_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "LANGUAGE_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

export function _logout() {
  return dispatch => {
    PushNotification.removeToken();
    dispatch({type: "LOGOUT_SUCCESS"});
    Actions.reset("auth");
  };
}
