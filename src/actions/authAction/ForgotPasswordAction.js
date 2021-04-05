import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";
import {Server_URL} from "../../constants/url";
export const _forgotPasswordaction = data => {
  return dispatch => {
    dispatch({type: "FORGOT_PASSWORD_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Server_URL}/forget`, {
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
            // CommonToast(responseJson.response.message);

            dispatch({
              type: "FORGOT_PASSWORD_SUCCESS",
              payload: responseJson,
            });
            if (responseJson.status === 200) {
              //Actions.dashboard();
              CommonToast(responseJson.message);
            } else {
              CommonToast(responseJson.message, false);
            }
          })
          .catch(() => {
            dispatch({type: "FORGOT_PASSWORD_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "FORGOT_PASSWORD_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
};
