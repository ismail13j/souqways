import {Actions} from "react-native-router-flux";
import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export function _changePasswordAction(data, _emptyForm = () => {}) {
  return dispatch => {
    dispatch({type: "CHANGE_PASSWORD_REQUEST"});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/change_password`, {
          method: "POST",
          body: data,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            dispatch({
              type: "CHANGE_PASSWORD_SUCCESS",
              payload: responseJson,
            });
            _emptyForm();
            if (responseJson.status === "200") {
              Actions.pop();
            } else {
              CommonToast(responseJson.message, false);
            }
          })
          .catch(() => {
            dispatch({type: "CHANGE_PASSWORD_FAIL"});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        dispatch({type: "CHANGE_PASSWORD_FAIL"});
        CommonToast(strings.connectionError, false);
      });
  };
}

/*

RestClient.isConnected().then(()=>{
          // CommonToast(strings.serverError);
          // });
    }) .catch(() => {
        CommonToast(strings.connectionError);
      });

*/
