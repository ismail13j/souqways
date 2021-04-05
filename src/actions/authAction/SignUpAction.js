import {Actions} from "react-native-router-flux";
import {Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import {Platform} from "react-native";
import PushNotification from "../../helper/pushNotifications";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export function _signUpAction(data) {
  return dispatch => {
    dispatch({type: "SIGN_UP_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        data.device_id = Platform.OS;
        PushNotification.getFirebaseToken()
          .then(token => (data.device_token = token))
          .catch(() => (data.device_token = ""));
        fetch(`${Server_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: data.token,
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: responseJson,
                isRemind: false,
                data: {},
              });
              Actions.dashboard();
            } else {
              dispatch({type: "SIGN_UP_FAIL"});
              CommonToast(responseJson.message, false);
            }
          })
          .catch(() => {
            dispatch({type: "SIGN_UP_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "SIGN_UP_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}
