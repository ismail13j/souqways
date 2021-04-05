import {Latest_Server_URL} from "../../constants/url";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export function editProfile(data, callback = () => {}) {
  return dispatch => {
    dispatch({type: "EDIT_PROFILE_REQUEST", data});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/user-profile`, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "EDIT_PROFILE_SUCCESS",
                payload: responseJson.data,
              });

              callback(responseJson.data);
            } else {
              dispatch({type: "EDIT_PROFILE_FAIL", responseJson});
              CommonToast(responseJson.message, false);
            }
          })
          .catch(e => {
            dispatch({type: "EDIT_PROFILE_FAIL", e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        dispatch({type: "EDIT_PROFILE_FAIL", e});
        CommonToast(strings.connectionError, false);
      });
  };
}
